import { User } from './User';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Project {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({ nullable: true })
    description: string

    @Column({ nullable: true })
    background: string

    @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date

    @ManyToMany(() => User, user => user.projects)
    @JoinTable()
    users: User[]
}