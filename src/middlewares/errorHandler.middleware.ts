import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.error(err.stack);
  if (err.message === "Email already exists") {
    res.status(400).json({ error: err.message });
    return;
  }
  if (err.message === "User not found") {
    res.status(404).json({ error: err.message });
    return;
  }
  if (err.message === "Invalid credentials") {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({ error: "Internal Server Error" });
};
