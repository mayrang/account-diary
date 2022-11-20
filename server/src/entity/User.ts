import {BaseEntity, PrimaryGeneratedColumn, Column, Entity,  BeforeInsert, OneToMany} from "typeorm";
import {IsEmail, Length} from "class-validator";
import bcrypt from "bcryptjs";
import { Post } from "./Post";
import { Account } from "./Account";

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number;

 
    @Length(1, 255, {message: "이메일은 비워둘 수 없습니다."})
    @IsEmail(undefined, {message: "이메일 형식으로 작성하여야 합니다."})
    @Column({unique: true})
    @Column()
    email: string;

    @Length(6, 255, {message: "비밀번호는 6자리 이상이여야 합니다."})
    @Column()
    password: string;

    @Length(1, 32, {message: "닉네임은 비워둘 수 없습니다."})
    @Column({unique: true})
    nickname: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToMany(() => Account, (account) => account.user)
    accounts: Account[];

    @BeforeInsert()
    async hashpassword(){
        this.password = await bcrypt.hash(this.password, 6);
    }

}