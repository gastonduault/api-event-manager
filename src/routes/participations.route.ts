import { Router } from "express";
import { ParticipationController } from "../controllers/participations.controller";
import { authenticateUser } from "../middlewares/authentication.middleware";
const router = Router();

/**
 * @swagger
 * /api/participations/users/{userId}/events/{eventId}:
 *   post:
 *     tags:
 *       - Participations
 *     summary: User participation in an event
 *     security:
 *       - BearerAuth: []
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
  authenticateUser,
  ParticipationController.participate,
);
/**
 * @swagger
 * /api/participations/users/{userId}/events/{eventId}:
 *   delete:
 *     tags:
 *       - Participations
 *     summary: Cancel user participation in an event
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the user
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event
 *     responses:
 *       200:
 *         description: User participation successfully canceled
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Event not found
 */
router.delete(
  "/participations/users/:userId/events/:eventId",
  authenticateUser,
  ParticipationController.cancelParticipation,
);
export default router;
