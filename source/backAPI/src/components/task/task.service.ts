import { Request } from 'express';
import pgDataSource from '../../config/dbconnects';
import  Task, { SubTask }  from './task.model';
import Project from '../project/project.model';

interface ITaskService {
    getAllTasks(req: Request):Promise<Task[] | null>;
    createTask(req: Request):Promise<Task | null>;
    updateTask(req: Request):Promise<Task | null>;
    getTask(req: Request):Promise<Task | null>;
    removeTask(req: Request):Promise<string | null>;
}

class TaskService implements ITaskService {
    async getAllTasks(req: Request): Promise<Task[] | null> {
        try{if(req.params.taskId == undefined){
                return await pgDataSource.getRepository(Task).find({
                    relations:{
                        taskProject : true
                    },
                    where: {
                        taskProject : {
                            projectId : req.params.projectId                            
                        }
                    }
                });}
            else
                return await pgDataSource.getRepository(SubTask).find({
                    relations:{
                        taskProject : true
                    },
                    where: {
                        taskProject : {
                            projectId : req.params.projectId
                        },
                        taskParentOfSubTask : {
                            taskId : req.params.taskId
                        }
                    }
                });
        } catch(err:any){
            console.log(err.message)
           return null;
        }
    }
    async createTask(req: Request): Promise<Task | null> {
    
        try {
            // find the project
            const project: Project = await pgDataSource.getRepository(Project).findOneByOrFail({
                projectId: req.params.projectId
               });
            
            if(req.params.taskId == undefined){
                // Edit new task
                const task: Task = req.body;
                task.taskProject = project;

                return await pgDataSource.transaction(async (transactionEntityManager) =>
                //Add new task
                    await transactionEntityManager.getRepository(Task).save(task)
                );
            }                
            else {
                //Find subtask parent
                const task: Task = await pgDataSource.getRepository(Task).findOneByOrFail(
                    {taskId:req.params.taskId}
                 )
                // Edit new task
                let subTask: SubTask = req.body;
                subTask.taskProject = project;
                subTask.taskParentOfSubTask = task;

                return await pgDataSource.transaction(async transactionEntityManager => 
                    await transactionEntityManager.getRepository(SubTask).save(subTask)
                );    
            }

        } catch (error) {
            console.error('Error creating task:', error);
            return null;
        }
    }
    async updateTask(req: Request): Promise<Task | null> {
        try {
            if(req.params.taskId == undefined){
                return await pgDataSource.transaction(async (transactionEntityManager) => 
                    await transactionEntityManager.getRepository(Task).save(req.body)
                );
            }
            else {
                return await pgDataSource.transaction(async (transactionEntityManager) => 
                    await transactionEntityManager.getRepository(SubTask).save(req.body)
                );
            }

        } catch (error) {
            console.error('Error updating task:', error);
            return null;
        }
    }
    async getTask(req: Request): Promise<Task | null> {
        try {
            if(req.params.subTaskId == undefined){
                return await pgDataSource.getRepository(Task).findOne({
                    where: {
                        taskId : req.params.taskId
                    }
                });
            }
            else {
                return await pgDataSource.getRepository(SubTask).findOne({
                    where: {
                        taskId : req.params.subTaskId
                    }
                });
            }

        } catch (error) {
            console.error('Error getting task:', error);
            return null;
        }
    }
    async removeTask(req: Request): Promise<string | null> {
        try {
            if(req.params.taskId == undefined){
                await pgDataSource.transaction(async (transactionEntityManager) => 
                    await transactionEntityManager.getRepository(Task).delete({
                        taskId:req.params.taskId
                    })
                );
                return "Task removed successfully!";
            }
            else {
                await pgDataSource.transaction(async (transactionEntityManager) => 
                    await transactionEntityManager.getRepository(SubTask).delete({
                        taskId:req.params.subTaskId
                    })
                );
                return "SubTask removed successfully!";
            }
           
        } catch (error) {
            console.error('Error removing task:', error);
            return null;
        }
    }
}
export default new TaskService();