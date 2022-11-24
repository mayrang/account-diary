import { Expose } from "class-transformer";
import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";


@Entity("accounts")
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    accountId: number;

    @Column()
    value: number;

    @CreateDateColumn()
    createAt: Date;

    @Column()
    content: string;

    @Column()
    type: string;


    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.accounts, {onDelete: "CASCADE"})
    @JoinColumn({name: "userId", referencedColumnName: "userId"})
    user: User;

    @Expose()
    get typeValue():number{
        if(this.type === "spending"){
            return this.value * -1;
        }else if(this.type === "income"){
            return this.value;
        }else{
            return 0;
        }
    }
}