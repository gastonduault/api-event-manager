import { Router } from "express";
import { TypeController } from "../controllers/types.controller";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/authentication.middleware";
const router = Router();

/**
 * @swagger
 * /api/types:
 *   get:
 *     tags:
 *       - Types
 *     summary: Get a list of all event types
 *     parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            default: 1
 *          description: Page number
 *        - in: query
 *          name: pageSize
 *          schema:
 *            type: integer
 *            default: 10
 *          description: Number of items per page
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of types
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Flea market"
 */
router.get("/types", TypeController.getTypes);

/**
 * @swagger
 * /api/types/{id}:
 *   get:
 *     tags:
 *       - Types
 *     summary: Retrieve a specific event type by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the type to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the type
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Conference"
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Type not found
 */
router.get("/types/:id", TypeController.getTypeById);

/**
 * @swagger
 * /api/types:
 *   post:
 *     tags:
 *       - Types
 *     summary: Create a new type
 *     security:
 *      - BearerAuth: []
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
 *       409:
 *         description: Type already exists
 *       403:
 *         description: Forbidden
 */
router.post(
  "/types",
  authenticateUser,
  authorizeAdmin,
  TypeController.createType,
);

/**
 * @swagger
 * /api/types/{id}:
 *   put:
 *     tags:
 *       - Types
 *     summary: Update an existing type
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the type to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated type name"
 *     responses:
 *       200:
 *         description: Type updated successfully
 *       400:
 *         description: Invalid ID or missing required field
 *       404:
 *         description: Type not found
 *       409:
 *         description: Type already exists
 */
router.put(
  "/types/:id",
  authenticateUser,
  authorizeAdmin,
  TypeController.updateType,
);

/**
 * @swagger
 * /api/types/{id}:
 *   delete:
 *     tags:
 *       - Types
 *     summary: Delete a type
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the type to delete
 *     responses:
 *       204:
 *         description: Type deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Type not found
 *       409:
 *         description: Type already exists
 */
router.delete(
  "/types/:id",
  authenticateUser,
  authorizeAdmin,
  TypeController.deleteType,
);

export default router;
