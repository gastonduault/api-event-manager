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
}
