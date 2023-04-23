import { ProjectController } from './project.controller';
import { Application } from "express";

class RoutesProject{
    public routes(app: Application):void{
        app.route("/projects")
        .get(ProjectController.getAllProjects);
        app.route("/project/created")
        .post(ProjectController.createProject);
        app.route("/project/updated")
        .put(ProjectController.updateProject);
        app.route("/project/:projectId/removed")
        .delete(ProjectController.removeProject);
        app.route("/project/:projectId")
        .get(ProjectController.getProject);
    }
}
export default RoutesProject;