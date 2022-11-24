import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";

@Entity("posts")
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    postId: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.posts, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User;

    


} 