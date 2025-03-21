import { User } from "../entities/users.entitie";
import { UsersService } from "../services/users.service";
import { Request, Response, NextFunction } from "express";

export class UserController {
  static createUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { user, token } = await UsersService.createUser(req.body);
      res.status(200).json({ user, token });
    } catch (error) {
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

  static deleteUser = async (
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

      await UsersService.deleteUser(userId);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      if (error.message === "User not found") {
        res.status(404).json({ error: error.message });
        return;
      }
      next(error);
    }
  };

  static getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { error, value } = User.paramsFilter(req.query);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }

      const usersData = await UsersService.getUsers(value);
      res.status(200).json(usersData);
    } catch (error) {
      next(error);
    }
  };
}
