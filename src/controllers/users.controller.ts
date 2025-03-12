import { Request, Response } from "express";
import { UsersService } from "../services/users.service";

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const user = await UsersService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
