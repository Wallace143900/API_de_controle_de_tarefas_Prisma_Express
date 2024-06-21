import { Router } from "express";
import { categoryRouter } from "./category.router";
import { taksControllers } from "../controllers/task.controller";
import { ValidateBody } from "../middleware/validateBody.middleware";
import { taskCreateSchema, taskUpdateSchema } from "../schemas/task.schemas";
import { IsTaskIdValid } from "../middleware/isTaskValid.middleware";

export const tasksRouter = Router();

const taskControllers = new taksControllers();

tasksRouter.post("/", ValidateBody.execute(taskCreateSchema), taskControllers.create);

tasksRouter.get("/", taskControllers.findMany);

tasksRouter.get("/:id", taskControllers.findOne);

tasksRouter.patch("/:id", ValidateBody.execute(taskUpdateSchema), IsTaskIdValid.execute ,taskControllers.update);

tasksRouter.delete("/:id", IsTaskIdValid.execute , taskControllers.delete);