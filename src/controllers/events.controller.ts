import { Request, Response } from "express";
import { EventService } from "../services/events.service";
import {
  eventQuerySchema,
  eventIdSchema,
  eventSchema,
} from "../schemas/events.schema";
import { prisma } from "../prismaClient";
import { paginationSchema } from "../schemas/types.schema";
import { ParticipationResponse } from "../entities/participations.entity";
import { TypeService } from "../services/types.service";
import { UsersService } from "../services/users.service";
import jwt from "jsonwebtoken";

export class EventController {
  static async getEvents(req: Request, res: Response) {
    try {
      const { error, value } = eventQuerySchema.validate(req.query);
      if (error) {
        res.status(400).send({ error: error.details[0].message });
        return;
      }

      const userId = (req as any).user?.userId;

      const user = userId ? await UsersService.getUserById(userId) : null;

      if (value.status === "unmoderated" && !user?.isAdmin) {
        res
          .status(403)
          .json({ message: "Access denied to unmoderated events" });
        return;
      }
      let statusFilter = "moderated";
      if (user?.isAdmin) {
        statusFilter = value.status;
      }

      const filters = {
        status: statusFilter,
        type: value.type,
        startDate: value.startDate,
        endDate: value.endDate,
        date: value.date,
        location: value.location,
        page: value.page || 1,
        pageSize: value.pageSize || 10,
      };
      const events = await EventService.getEvents(filters);
      res.status(200).send(events);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Internal server error", message: error.message });
    }
  }

  static async createEvent(req: Request, res: Response) {
    try {
      const { error, value } = eventSchema.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        console.error("Validation Error:", error.details);

        res.status(400).json({
          error: "Validation error",
          details: error.details.map((err) => err.message),
        });
        return;
      }

      const { responsableId, typeId } = req.body;
      const responsable = await UsersService.getUserById(responsableId);
      if (!responsable) {
        res.status(404).json({
          error: "Invalid responsableId",
          message: `No user found with ID ${responsableId}`,
        });
        return;
      }

      const eventType = await TypeService.getTypeById(typeId);
      if (!eventType) {
        res.status(404).json({
          error: "Invalid typeId",
          message: `No event type found with ID ${typeId}`,
        });
        return;
      }
      const newEvent = await EventService.createEvent(value);
      res.status(201).json(newEvent);
    } catch (error) {
      console.error("Server Error:", error);
      res
        .status(500)
        .json({ error: "Internal server error", message: error.message });
    }
  }

  static async getEventById(req: Request, res: Response) {
    try {
      const { error } = eventIdSchema.validate(req.params);

      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const eventId = parseInt(req.params.id, 10);

      const event = await EventService.getEventById(eventId);
      if (!event) {
        res.status(404).json({
          error: "Event not found",
          message: `No event found with ID ${eventId}`,
        });
        return;
      }

      const userId = (req as any).user?.userId;
      const user = userId ? await UsersService.getUserById(userId) : null;
      // Access denied if event is not moderate and user is not the responsable or admin
      if (
        !event.isModerate &&
        userId !== event.responsableId &&
        !user?.isAdmin
      ) {
        res.status(403).json({ message: "Access denied to this event" });
        return;
      }
      res.status(200).json(event);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
  static async updateEvent(req: Request, res: Response) {
    try {
      const { error: paramsError } = eventIdSchema.validate(req.params);
      if (paramsError) {
        res.status(400).json({ error: paramsError.details[0].message });
        return;
      }

      const eventId = parseInt(req.params.id, 10);

      const existingEvent = await EventService.getEventById(eventId);
      if (!existingEvent) {
        res.status(404).json({
          error: "Event not found",
          message: `No event found with ID ${eventId}`,
        });
        return;
      }
      const { error: bodyError, value } = eventSchema.validate(req.body, {
        abortEarly: false,
      });
      if (bodyError) {
        res.status(400).json({
          error: "Validation error",
          details: bodyError.details.map((err) => err.message),
        });
        return;
      }

      const { responsableId, typeId } = req.body;

      const responsable = await UsersService.getUserById(responsableId);
      if (!responsable) {
        res.status(404).json({
          error: "Invalid responsibleId",
          message: `No responsable found with ID ${responsableId}`,
        });
        return;
      }
      const eventType = await TypeService.getTypeById(typeId);
      if (!eventType) {
        res.status(404).json({
          error: "Invalid typeId",
          message: `No event type found with ID ${typeId}`,
        });
        return;
      }

      const userId = (req as any).user?.userId;
      if (userId !== existingEvent.responsableId) {
        res.status(403).json({
          error: "Access denied",
          message: "You are not allowed to update this event",
        });
        return;
      }

      const event = await EventService.updateEvent(eventId, value);

      res.status(200).json(event);
    } catch (error) {
      if (error.message === "Event not found") {
        res.status(404).send({ error: "Event not found" });
        return;
      }
      res.status(500).send({ error: "Internal server error" });
    }
  }
  static async removeEvent(req: Request, res: Response) {
    try {
      const { error } = eventIdSchema.validate(req.params);

      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const eventId = parseInt(req.params.id, 10);

      const event = await EventService.getEventById(eventId);
      if (!event) {
        res.status(404).json({ error: "Event not found" });
        return;
      }

      const userId = (req as any).user?.userId;
      if (userId !== event.responsableId) {
        res.status(403).json({
          error: "Access denied",
          message: "You are not allowed to delete this event",
        });
        return;
      }
      await EventService.removeEvent(eventId);

      res.status(200).json({ message: "Event deleted successfully" });
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }

  static async getParticipations(req: Request, res: Response) {
    try {
      const { error } = eventIdSchema.validate(req.params);

      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const eventId = parseInt(req.params.id, 10);
      const event = await EventService.getEventById(eventId);
      if (!event) {
        res.status(404).json({
          error: "Event not found or access denied",
          message: `No event found with ID ${eventId}`,
        });
        return;
      }

      const userId = (req as any).user?.userId;
      if (userId !== event.responsableId) {
        res.status(403).json({
          error: "Access denied",
          message: "You are not allowed to access this event",
        });
        return;
      }

      const { error: errorPage, value } = paginationSchema.validate(req.query);
      if (errorPage) {
        res.status(400).json({ error: errorPage.details[0].message });
      }

      const filters = {
        page: value.page ? parseInt(value.page, 10) : 1,
        pageSize: value.pageSize ? parseInt(value.pageSize, 10) : 10,
      };
      const participations = await EventService.getParticipations(
        eventId,
        filters,
      );
      if (!participations) {
        res.status(404).json({
          error: "No participations found",
          message: `No participations found for event with ID ${eventId}`,
        });
        return;
      }
      const response = participations.map(ParticipationResponse.fromPrisma);

      res.status(200).json(response);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }
}
