import { UsersService } from "../services/users.service";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      email: string;
    };

    (req as any).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized: Invalid token" });
    return;
  }
};

export const authorizeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userIdFromToken = (req as any).user?.userId;
  const userIdFromParams = parseInt(req.params.id, 10);
  const user = await UsersService.getUserById(userIdFromToken);

  if (!user.isAdmin) {
    if (isNaN(userIdFromParams) || userIdFromToken !== userIdFromParams) {
      res
        .status(403)
        .json({ error: "Forbidden: You are not allowed to modify this user" });
      return;
    }
  }
  next();
};

export const authorizeUserEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const userIdFromToken = (req as any).user?.userId;
  const userIdFromParams = parseInt(req.body.responsableId, 10);
  const user = await UsersService.getUserById(userIdFromToken);

  if (!user.isAdmin) {
    if (isNaN(userIdFromParams) || userIdFromToken !== userIdFromParams) {
      res.status(403).json({
        error:
          "Forbidden: You are not allowed to create/modify an event for this user",
      });
      return;
    }
  }
  next();
};

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await UsersService.getUserById(userId);

    if (!user || !user.isAdmin) {
      res.status(403).json({ message: "Admin access required" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const authorizeBasedOnParams = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = (req as any).user.userId;
    const user = await UsersService.getUserById(userId);

    const paramName = req.params.name;

    if (paramName === "someValue" && !user?.isAdmin) {
      res.status(403).json({ message: "Access denied for this parameter" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};
