import { Request, Response } from "express";
import { EventService } from "../services/events.service";

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
      const eventData = req.body;
      const newEvent = await EventService.createEvent(eventData);
      res.status(201).send(newEvent);
    } catch (error) {
      console.log();
      res.status(500).send({ error: "Internal server error", message: error });
    }
  }
}
