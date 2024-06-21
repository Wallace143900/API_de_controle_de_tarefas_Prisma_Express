import { z } from "zod";
import { categorySchema } from "./category.schemas";

export const taskSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(1),
    content: z.string().min(1),
    finished: z.boolean().default(false),
    categoryId: z.number().positive().nullish()
})

export const taskCreateSchema = taskSchema.omit({ id: true});

export const taskUpdateSchema = taskCreateSchema.partial();

export const TTaskReturn = taskSchema.extend({category: categorySchema.nullish() }).omit({categoryId: true});

export type TTask = z.infer<typeof taskSchema>;


export type TTaskCreate = z.infer<typeof taskCreateSchema>;

export type TTaskUpdate = z.infer<typeof taskUpdateSchema>;