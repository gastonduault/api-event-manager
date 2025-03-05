import { Router, Request, Response } from "express";
import { prisma } from "../prismaClient";
const router = Router();

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *               firstname:
 *                 type: string
 *                 example: "John"
 *               lastname:
 *                 type: string
 *                 example: "Doe"
 *               isAdmin:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing required fields or email already exists
 */
router.post("/users", async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname, isAdmin } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const newUser = await prisma.user.create({
      data: { email, password, firstname, lastname, isAdmin: isAdmin ?? false },
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user", details: error });
  }
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       firstname:
 *                         type: string
 *                         example: "John"
 *                       lastname:
 *                         type: string
 *                         example: "Doe"
 */
router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, firstname: true, lastname: true },
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users", details: error });
  }
});

export default router;
