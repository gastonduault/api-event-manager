import { Router, Request, Response } from "express";

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

router.get("/events", (req: Request, res: Response) => {
  res.status(200).send({ events: ["Event 15553", "Event 2", "Event 3"] });
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
 *             properties:
 *               eventName:
 *                 type: string
 *                 example: "New Event"
 *     responses:
 *       200:
 *         description: Event created
 *       400:
 *         description: Bad request
 */
router.post("/events", (req: Request, res: Response) => {
  const { eventName } = req.body;

  if (!eventName) {
    res.status(400).send({ error: "Event name is required" });
    return;
  }
  res
    .status(200)
    .send({ message: `Event '${eventName}' created successfully` });
});

export default router;
