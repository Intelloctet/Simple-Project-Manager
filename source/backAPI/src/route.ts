import { Application } from "express";
import RoutesProject from "./components/project/project.route";
import RoutesTask from "./components/task/task.route";

class Routes {

    public routeProject: RoutesProject = new RoutesProject();
    public routeTask: RoutesTask = new RoutesTask();

    public routes(app: Application):void {
        
        app.route('/')
        .get((req, res) => {console.log("Welcome to SIMPLE"); res.send('Welcome to SIMPLE')})
        
        this.routeProject.routes(app);
        this.routeTask.routes(app);

        // Not found handler middleware
        app.use((req, res, next) => {
            res.status(404).send('Sorry, the requested URL path was not found on this server.');
        });
    }
}
export default Routes;