import { NextFunction, Request, Response } from "express";
import { CategoryServices } from "../services/category.services";

export class CategoryControllers{
    async create(req: Request, res: Response) {
          const { name } = req.body;
          const categoryServices = new CategoryServices();
          const category = await categoryServices.create({ name });
          return res.status(201).json(category);
      }

      async delete(req: Request, res: Response) {
          const { id } = req.params;
          const categoryId = Number(id);
          const categoryServices = new CategoryServices();
          await categoryServices.delete(categoryId);
          return res.status(204).send();
      }
}