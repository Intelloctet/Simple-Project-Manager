import Project from './../project/project.model';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class Task {
    @PrimaryGeneratedColumn('uuid')
   taskId!: string;
    @Column({type:'varchar',length:50})
    taskTitle!: string;
    @Column({type:'varchar',length:100})
    taskPurpose!: string;
    @Column({type:'date'})
    taskBegin!: Date;
    @Column({type:'date'})
    taskEnd!: Date;

    //SubTask content
    @OneToMany(() => SubTask, subTask => subTask.taskParentOfSubTask)
    taskSubTask!:SubTask[];

    //Project and Task relation
    @JoinColumn({name:'taskProjectId'})
    @ManyToOne(() => Project, project => project.tasks)
    taskProject!: Project;
}

@Entity()
export class SubTask extends Task{
    @JoinColumn({name:'subTaskParentId'})
    @ManyToOne(() => Task, task => task.taskSubTask)
    taskParentOfSubTask!:Task;
}

export default Task;