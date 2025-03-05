import { Router, Request, Response } from "express";
import { prisma } from "../prismaClient";
const router = Router();

/**
 * @swagger
 * /api/types:
 *   post:
 *     tags:
 *       - Types
 *     summary: Create a new type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Flea market"
 *     responses:
 *       201:
 *         description: Type created successfully
 *       400:
 *         description: Missing required field
 */
router.post("/types", async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "Name is required" });
      return;
    }

    const newType = await prisma.type.create({
      data: { name },
    });

    res
      .status(201)
      .json({ message: "Type created successfully", user: newType });
  } catch (error) {
    console.error("Error creating type:", error);
    res.status(500).json({ error: "Failed to create type", details: error });
  }
});

export default router;
