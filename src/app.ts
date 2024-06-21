import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./middleware/handleErrors.middleware";
import { tasksRouter } from "./routes/task.router";
import { categoryRouter } from "./routes/category.router";


export const app = express();

app.use(json());

app.use(helmet());

app.use("/tasks", tasksRouter);

app.use("/categories", categoryRouter);

app.use(HandleErrors.execute);