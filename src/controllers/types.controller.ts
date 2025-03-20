import { Request, Response } from "express";
import { TypeService } from "../services/types.service";
import { typeIdSchema, typeSchema } from "../schemas/types.schema";

export class TypeController {
  static async getTypes(req: Request, res: Response) {
    try {
      const types = await TypeService.getTypes();
      res.status(200).send(types);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Internal server error", message: error.message });
    }
  }

  static async getTypeById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      //validate
      const { error } = typeIdSchema.validate({ id });
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const type = await TypeService.getTypeById(id);
      if (!type) {
        res.status(404).json({ error: "Type not found" });
        return;
      }
      res.status(200).send(type);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Internal server error", message: error.message });
    }
  }

  static async createType(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const { error } = typeSchema.validate({ name });
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const newType = await TypeService.createType(name);
      res.status(201).send(newType);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Internal server error", message: error.message });
    }
  }

  static async updateType(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { error: errorId } = typeIdSchema.validate({ id });
      if (errorId) {
        res.status(400).json({ error: errorId.details[0].message });
        return;
      }
      const { name } = req.body;
      const { error } = typeSchema.validate({ name });
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const updatedType = await TypeService.updateType(id, { name });
      res.status(200).send(updatedType);
    } catch (error) {
      res
        .status(500)
        .send({ error: "Internal server error", message: error.message });
    }
  }

  static async deleteType(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const { error } = typeIdSchema.validate({ id });
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      await TypeService.deleteType(id);
      res.status(204).send();
    } catch (error) {
      res
        .status(500)
        .send({ error: "Internal server error", message: error.message });
    }
  }
}
