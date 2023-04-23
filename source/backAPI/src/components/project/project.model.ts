import Task  from './../task/task.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Project {
    @PrimaryGeneratedColumn('uuid')
    projectId!: string;
    @Column({type:'varchar',length:50})
    projectTitle!: string;
    @Column({type:'varchar',length:100})
    projectPurpose!: string;
    @Column({type:'date'})
    projectBegin!: Date;
    @Column({type:'date'})
    projectEnd!: Date;
    @OneToMany(() => Task, task => task.taskProject)
    tasks!: Task[];
}

export default Project;