import pgDataSource from './config/dbconnects';
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from 'helmet';
import cors from 'cors';
import Routes from './route';

class App {
    public app: Application;
    private routes: Routes = new Routes();

    constructor(){
        this.app = express();
        this.config();
        this.routes.routes(this.app);
    }
    private config(): void {
        pgDataSource
        .initialize()
        .then(() => {console.log("Connected to database success!")})
        .catch((err:any) => { console.log(`Your database was offline ${err}`,err)});

        this.app.use(express.json(),helmet(),cors());
        this.app.use((req:Request,res:Response,next:NextFunction) => {
            res.header('Access-Control-Allow-Origin','*');
            res.header('Access-Control-Allow-Methodes','GET,POST,DELETE,OPTIONS,PUT');
            res.header('Access-Control-Allow-Header','*');
            next();
        })
    }
}

export default new App().app;