import { Request, Response, NextFunction } from "express";
import { UsersService } from "../services/users.service";
import { User } from "../entities/entities.user";

export class UserController {
  static createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user = await UsersService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error.message === "Email already exists") {
        res.status(400).json({ error: error.message });
        return;
      }
      next(error);
    }
  };

  static updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = parseInt(req.params.id, 10);
      if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
        return;
      }

      const { error } = User.validateUpdate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const updatedUser = await UsersService.updateUser(userId, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      next(error);
    }
  };
}
