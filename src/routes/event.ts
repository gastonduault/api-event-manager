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
 */
router.get("/events", (req: Request, res: Response) => {
  res.status(200).send({ events: ["Event 1", "Event 2", "Event 3"] });
});

export default router;
