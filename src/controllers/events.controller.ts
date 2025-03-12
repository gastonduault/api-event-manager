import { Request, Response } from "express";
import { EventService } from "../services/events.service";
import { Event } from "../entities/events.entity";
import { prisma } from "../prismaClient";

export class EventController {
  static async getEvents(req: Request, res: Response) {
    try {
      const events = await EventService.getEvents();
      res.status(200).send(events);
    } catch (error) {
      res.status(500).send({ error: "Internal server error" });
    }
  }

  static async createEvent(req: Request, res: Response) {
    try {
      const { error, value } = Event.validate(req.body);
      if (error) {
        console.error("Validation Error:", error.details);

        res.status(400).json({
          error: "Validation error",
          message: error.message,
        });
        return;
      }

      const { responsableId, typeId, ...eventData } = req.body;

      //TODO : modify if responsableId or typeId are invalid with the service

      // const { responsableId, typeId } = value;
      //
      // const responsable = await ResponsableService.findById(responsableId);
      // if (!responsable) {
      //   return res.status(400).json({
      //     error: "Invalid responsibleId",
      //     message: `No responsable found with ID ${responsableId}`,
      //   });
      // }
      //
      // const eventType = await EventTypeService.findById(typeId);
      // if (!eventType) {
      //   return res.status(400).json({
      //     error: "Invalid typeId",
      //     message: `No event type found with ID ${typeId}`,
      //   });
      // }
      const responsable = await prisma.user.findUnique({
        where: { id: responsableId },
      });

      if (!responsable) {
        res.status(400).json({
          error: "Invalid responsableId",
          message: `No user found with ID ${responsableId}`,
        });
        return;
      }

      const eventType = await prisma.type.findUnique({
        where: { id: typeId },
      });

      if (!eventType) {
        res.status(400).json({
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
}
