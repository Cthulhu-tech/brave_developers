import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "src/modules/message/entities/message.entity";
import { User } from "src/modules/user/entities/user.entity";

@Entity("Room")

export class Room extends BaseEntity {
    @PrimaryGeneratedColumn({comment: "Primary key Room"})
    id: number;

    @Column({
        type: "varchar"
    })
    name: string;

    @ManyToOne(() => User, user => user.login)
    @JoinColumn()
    user_created: User;

    @OneToMany(() => Message, message => message.id)
    @JoinColumn()
    message: Message;
}
