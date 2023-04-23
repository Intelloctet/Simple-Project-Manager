import { NextFunction, Request, Response } from "express";
import ProjectService from "./project.service";

export class ProjectController{
    public static async getAllProjects(req: Request, res:Response,next: NextFunction){
        const data = await ProjectService.getAllProjects("",0,0);
        res.status(200).json(data);
    }

    public static async createProject(req: Request, res:Response, next: NextFunction){
        const data = await ProjectService.createProject(req.body);
        res.status(201).json(data);
    }

    public static async updateProject(req: Request, res:Response, next: NextFunction){
        const data = await ProjectService.updateProject(req.body);
        res.status(201).json(data);
    }

    public static async getProject(req: Request, res:Response, next: NextFunction){
        const data = await ProjectService.getProject(req.params.projectId);
        res.status(200).json(data);
    }

    public static async removeProject(req: Request, res:Response, next: NextFunction){
        const data = await ProjectService.removeProject(req.params.projectId);
        res.status(200).json(data);
    }
}