import { Request, Response } from "express";
import { EventService } from "../services/events.service";
import { eventQuerySchema } from "../schemas/events.schema";

export class EventController {
  static async getEvents(req: Request, res: Response) {
    try {
      const { error, value } = eventQuerySchema.validate(req.query);
      if (error) {
        res.status(400).send({ error: error.details[0].message });
        return;
      }
      const filters = {
        status: value.status,
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
}
