import { Request, Response, NextFunction } from "express";
import { User } from "../entities/users.entitie";

export const validateCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { error } = User.validateCreate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export const validateUpdateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { error } = User.validateUpdate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};
