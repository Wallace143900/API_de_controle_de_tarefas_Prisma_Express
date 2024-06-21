import { Router } from "express";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { CategoryControllers } from "../controllers/category.controller";
import { IsCategoryIdValid } from "../middleware/isCategoryValid.middleware";
import { HandleErrors } from "../middleware/handleErrors.middleware";

export const categoryRouter = Router();

const categoryControllers = new CategoryControllers();

categoryRouter.post("/", ValidateBody.execute(categoryCreateSchema), categoryControllers.create);

categoryRouter.delete("/:id", IsCategoryIdValid.execute ,categoryControllers.delete);