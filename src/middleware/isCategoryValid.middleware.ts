import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/appError";

export class IsCategoryIdValid {
    static async execute(req: Request, res: Response, next: NextFunction) {
      const id = req.params.id;
  
      const category = await prisma.category.findFirst({
        where: { id: Number(id) }
      });
  
      if (!category) {
        throw new AppError(404, "Category not found");
      }
  
      res.locals.category = category;
      next();
    }
  }