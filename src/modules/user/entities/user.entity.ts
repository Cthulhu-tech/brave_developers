import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "src/modules/message/entities/message.entity";
import { Room } from "src/modules/room/entities/room.entity";
import { JWT } from "./token.entity";

@Entity("User")

export class User extends BaseEntity {
    @PrimaryGeneratedColumn({comment: "Primary key User"})
    id: number;

    @Column({
        type: "varchar"
    })
    login: string;

    @Column({
        type: "varchar"
    })
    password: string;

    @OneToMany(() => Room, room => room.id)
    @JoinColumn()
    room_id: Room;

    @OneToMany(() => Message, message => message.id)
    @JoinColumn()
    message: Message;

    @OneToMany(() => JWT, jwt => jwt.token)
    @JoinColumn()
    jwt: JWT;
}
