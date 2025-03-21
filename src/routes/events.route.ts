import { Router, Request, Response } from "express";
import { prisma } from "../prismaClient";
import { EventController } from "../controllers/events.controller";

const router = Router();

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - Events
 *     description: Get the list of events
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 events:
 *                   type: array
 *                   items:
 *                     type: string
 *                     example: "Event 1"
 *
 */

router.get("/events", EventController.getEvents);

/**
 * @swagger
 * /api/events:
 *   post:
 *     tags:
 *       - Events
 *     description: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - startDate
 *               - responsableId
 *               - typeId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Hackathon 2025"
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-01T09:00:00.000Z"
 *               responsableId:
 *                 type: integer
 *                 example: 1
 *               typeId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Event created
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/events", EventController.createEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     tags:
 *       - Events
 *     description: Get event details by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Event details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 10
 *                 name:
 *                   type: string
 *                   example: "Tech Conference 2025"
 *                 startDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-06-01T09:00:00Z"
 *                 endDate:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: "2025-06-02T18:00:00Z"
 *                 typeId:
 *                   type: integer
 *                   example: 2
 *                 responsableId:
 *                   type: integer
 *                   example: 5
 *                 maxParticipants:
 *                   type: integer
 *                   nullable: true
 *                   example: 100
 *       400:
 *         description: Invalid event ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request"
 *                 message:
 *                   type: string
 *                   example: "Event ID must be a valid number"
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Event not found"
 *                 message:
 *                   type: string
 *                   example: "No event found with ID 10"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error"
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get("/events/:id", EventController.getEventById);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     description: Remove event by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Event deleted successfully
 */

router.delete("/events/:id", EventController.removeEvent);
export default router;
