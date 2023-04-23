import { TaskController } from './task.controller';
import express,{ Application } from "express";

class RoutesTask{
    public routes(app: Application):void{
        const subPath = express.Router();

        subPath.route("/:projectId/tasks/:taskId?")
        .get(TaskController.getAllTasks);
        subPath.route("/:projectId/task/:taskId/:subTaskId?")
        .get(TaskController.getTask);
        subPath.route("/:projectId/task/created/:taskId?")
        .post(TaskController.createTask);
        subPath.route("/:projectId/task/updated/:taskId/:subTaskId?")
        .put(TaskController.updateTask);
        subPath.route("/:projectId/task/removed/:taskId/:subTaskId?")
        .delete(TaskController.removeTask);

        app.use('/project',subPath);
    }
}
export default RoutesTask;