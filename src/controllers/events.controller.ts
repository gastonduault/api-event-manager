import { Request, Response } from "express";
import { EventService } from "../services/events.service";
import { Event } from "../entities/events.entity";

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
