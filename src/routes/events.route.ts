import { Router } from "express";
import { EventController } from "../controllers/events.controller";

const router = Router();

/**
 * @swagger
 * /api/events:
 *   get:
 *     tags:
 *       - Events
 *     summary: Get the list of events
 *     parameters:
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter events by status (moderated/unmoderated)
 *         schema:
 *           type: string
 *       - name: type
 *         in: query
 *         required: false
 *         description: Filter events by type ID
 *         schema:
 *           type: integer
 *       - name: startDate
 *         in: query
 *         required: false
 *         description: Filter events starting from this date (ISO format)
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: endDate
 *         in: query
 *         required: false
 *         description: Filter events ending before this date (ISO format)
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: date
 *         in: query
 *         required: false
 *         description: Filter events by date (ISO format)
 *         schema:
 *           type: string
 *           format: date-time
 *       - name: location
 *         in: query
 *         required: false
 *         description: Filter events by location
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         description: Page number
 *         schema:
 *          type: integer
 *          minimum: 1
 *          default: 1
 *       - name: pageSize
 *         in: query
 *         required: false
 *         description: Number of items per page
 *         schema:
 *          type: integer
 *          minimum: 1
 *          maximum: 100
 *          default: 10
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
 *     summary: Create a new event
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
 *     summary: Retrieve event details by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the event to retrieve
 *         schema:
 *           type: integer
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
 * components:
 *   schemas:
 *     updateEventSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Hackathon 2025"
 *         responsableId:
 *           type: integer
 *           example: 1
 *         startDate:
 *           type: string
 *           format: date-time
 *           example: "2025-04-01T09:00:00.000Z"
 *         maxParticipants:
 *           type: integer
 *           example: 100
 *         typeId:
 *           type: integer
 *           example: 2
 */

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     tags:
 *       - Events
 *     summary: Update an existing event
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/updateEventSchema'
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.put("/events/:id", EventController.updateEvent);

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     tags:
 *       - Events
 *     summary: Remove event by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the event to delete
 *     responses:
 *       204:
 *         description: Event deleted successfully
 */

router.delete("/events/:id", EventController.removeEvent);

router.get("/events/:id/participations", EventController.getParticipations);

export default router;
