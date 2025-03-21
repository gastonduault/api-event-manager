import { Router } from "express";
import { ParticipationController } from "../controllers/participations.controller";
const router = Router();

/**
 * @swagger
 * /api/participations/users/{userId}/events/{eventId}:
 *   post:
 *     tags:
 *       - Participations
 *     summary: User participation in an event
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID of the user"
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: "ID of the event"
 *     responses:
 *       201:
 *         description: "User successfully added to the event"
 *       400:
 *         description: "Invalid request parameters or event is not moderated"
 *       404:
 *         description: "Event not found"
 */
router.post(
  "/participations/users/:userId/events/:eventId",
  ParticipationController.participate,
);

export default router;
