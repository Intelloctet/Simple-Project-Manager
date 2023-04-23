import Task from './../task/task.model';
import pgDataSource  from './../../config/dbconnects';
import Project  from "./project.model";

interface IProjectService{
    getAllProjects(kw:string,size:number,page:number): Promise<Project[] | null>;
    createProject(project:Project): Promise<Project| null> ;
    updateProject(project:Project): Promise<Project | null>;
    getProject(projectId:string): Promise<Project | null>;
    removeProject(projectId:string): Promise<string | null>
    getProgress(): Promise<number | null>;
}

class ProjectService implements IProjectService{

    getProgress(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    async getAllProjects(kw: string, size: number, page: number): Promise<Project[] | null> {
        try{
            return await pgDataSource.getRepository(Project).find({});
        } catch(error){
            console.error("Error in database!",error);
            return null;
        }
        
    }
    async createProject(project: Project): Promise<Project | null> {
        try {
            const result = await pgDataSource.transaction(async (transactionEntityManager) => {
                const projectRepo = transactionEntityManager.getRepository(Project);
                return await projectRepo.save(project);
            });
            return result;

        } catch (error) {
            console.error('Error creating project:', error);
            return null;
        }
    }
    async updateProject(project: Project): Promise<Project | null> {
        try {
            const result = await pgDataSource.transaction(async (transactionEntityManager) => {
                const projectRepo = transactionEntityManager.getRepository(Project);
                return await projectRepo.save(project);
            });
            return result;

        } catch (error) {
            console.error('Error updating project:', error);
            return null;
        }
    }
    async getProject(projectId: string): Promise<Project | null> {
        try {
            return await pgDataSource.getRepository(Project).findOne({
                where: {projectId : projectId}
            });

        } catch (error) {
            console.error('Error getting project:', error);
            return null;
        }
    }
    async removeProject(projectId: string): Promise<string | null> { 
        try {
            await pgDataSource.getRepository(Project).delete({
                projectId:projectId
            });
            return "Project removed successfully!"

        } catch (error) {
            console.error('Error removing project:', error);
            return null;
        }
    }
}
export default new ProjectService();
