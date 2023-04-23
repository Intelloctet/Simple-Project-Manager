import Task, { SubTask } from './../components/task/task.model';
import Project  from './../components/project/project.model';
import { DataSource } from "typeorm";

const pgDataSource = new DataSource ({
    type:"postgres",
    host:"localhost",
    port:5432,
    username:"io",
    password:"00001111",
    database:"spm",
    synchronize:true,
    entities:[Project,Task,SubTask],
    subscribers:[],
    migrations:[],
});
export default pgDataSource;