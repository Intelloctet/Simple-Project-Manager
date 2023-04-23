import { NextFunction, Request, Response } from "express";
import TaskService from "./task.service";

export class TaskController{
    public static async getAllTasks(req: Request, res:Response,next: NextFunction){
        const data = await TaskService.getAllTasks(req);
        if(data == null)  {res.status(400).send('Invalid UUID value'); return;}
        res.status(200).json(data);
    }

    public static async getTask(req: Request, res:Response,next: NextFunction){
        const data = await TaskService.getTask(req);
        res.status(200).json(data);
    }

    public static async createTask(req: Request, res:Response,next: NextFunction){
        const data = await TaskService.createTask(req);
        res.status(201).json(data);
    }

    public static async updateTask(req: Request, res:Response,next: NextFunction){
        const data = await TaskService.updateTask(req);
        res.status(200).json(data);
    }

    public static async removeTask(req: Request, res:Response,next: NextFunction){
        const data = await TaskService.removeTask(req);
        res.status(200).json(data);
    }

}