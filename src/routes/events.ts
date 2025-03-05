import { Router, Request, Response } from "express";
import { prisma } from "../prismaClient";

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

router.get("/events", async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

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
