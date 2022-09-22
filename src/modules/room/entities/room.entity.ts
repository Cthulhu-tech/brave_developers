import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "src/modules/message/entities/message.entity";

@Entity("Room")

export class Room extends BaseEntity {
    @PrimaryGeneratedColumn({comment: "Primary key Room"})
    id: number;

    @Column({
        type: "integer"
    })
    room: number;

    @Column({
        type: "varchar"
    })
    name: string;

    @OneToMany(() => Message, message => message.id)
    @JoinColumn()
    message: Message;
}
