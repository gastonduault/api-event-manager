import { Request, Response } from "express";
import { participationSchema } from "../schemas/participations.schema";
import { ParticipationService } from "../services/participations.service";

export class ParticipationController {
  static async participate(req: Request, res: Response) {
    try {
      const { userId, eventId } = req.params;
      const { error } = participationSchema.validate({
        idUser: Number(userId),
        idEvent: Number(eventId),
      });
      if (error) {
        res.status(400).send({ error: error.details[0].message });
        return;
      }

      const participation = await ParticipationService.participate(
        Number(userId),
        Number(eventId),
      );
      res
        .status(201)
        .json({ message: "User participation successfully registered" });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "Internal server error";

      res.status(status).json({ status, message });
    }
  }

  static async cancelParticipation(req: Request, res: Response) {
    try {
      const { userId, eventId } = req.params;
      const { error } = participationSchema.validate({
        idUser: Number(userId),
        idEvent: Number(eventId),
      });
      if (error) {
        res.status(400).send({ error: error.details[0].message });
        return;
      }

      const participation = await ParticipationService.findByUserIdAndEventId(
        Number(userId),
        Number(eventId),
      );
      if (!participation) {
        res.status(400).json({
          message: `User  ${userId} is not registered for this event ${eventId}`,
        });
        return;
      }
      const userIdFromToken = (req as any).user?.userId;
      if (userIdFromToken !== Number(userId)) {
        res.status(403).json({
          message: "You are not authorized to cancel this participation",
        });
        return;
      }

      await ParticipationService.cancelParticipation(
        Number(userId),
        Number(eventId),
      );
      res
        .status(200)
        .json({ message: "User participation successfully canceled" });
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "Internal server error";

      res.status(status).json({ status, message });
    }
  }
}
