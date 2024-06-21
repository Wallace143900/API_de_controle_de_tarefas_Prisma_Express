import { NextFunction, Request, Response } from "express";
import { TaskServices } from "../services/task.services";

export class taksControllers{

    async create(req: Request, res: Response){
    
            const taskServices = new TaskServices();
    
            const response = await taskServices.create(Number(req.params.id),req.body);
    
            return res.status(201).json(response);

    }

    async findMany(req: Request, res: Response){
            const taskServices = new TaskServices();
            
            const categoryParam = req.query.category;
    
            const response = await taskServices.findMany(categoryParam as string);
    
            return res.status(200).json(response);
    }

    async findOne(req: Request, res: Response){
            const taskServices = new TaskServices();
    
            const response = await taskServices.findOne(Number(req.params.id));
    
            return res.status(200).json(response);

    }

    async update(req: Request, res: Response, next: NextFunction){
            const taskServices = new TaskServices();
    
            const response = await taskServices.update(Number(req.params.id), req.body);
    
            return res.status(200).json(response);

    }

    async delete(req: Request, res: Response, next: NextFunction){
            const taskServices = new TaskServices();
    
            await taskServices.delete(Number(req.params.id));
    
            return res.status(204).send();

    }
}