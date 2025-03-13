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
 *     parameters:
 *       - name: status
 *         in: query
 *         required: false
 *         description: Filter events by status (moderated)
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
 *                 example: "2025-03-01T09:00:00.000Z"
 *               responsableId:
 *                 type: integer
 *                 example: 1
 *               typeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Event created
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/events", async (req: Request, res: Response) => {
  const {
    name,
    description,
    startDate,
    endDate,
    location,
    maxParticipants,
    picture,
    isModerate,
    responsableId,
    typeId,
  } = req.body;

  if (!name || !startDate || !responsableId || !typeId) {
    res.status(400).send({ error: "Missing required fields" });
    return;
  }
  try {
    const newEvent = await prisma.event.create({
      data: {
        name,
        description,
        startDate: new Date(startDate), // Conversion en Date
        endDate: endDate ? new Date(endDate) : null,
        location,
        maxParticipants,
        picture,
        isModerate: isModerate ?? false, // Valeur par défaut si non fournie
        responsableId,
        typeId,
      },
    });
    res
      .status(201)
      .json({ message: `Event '${newEvent.name}' created successfully` });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event", details: error });
  }
});

export default router;
