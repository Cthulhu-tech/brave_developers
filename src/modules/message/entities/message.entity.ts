import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";
import { Room } from "../../room/entities/room.entity";


@Entity("Message")

export class Message extends BaseEntity {
    @PrimaryGeneratedColumn({comment: "Primary key Message"})
    id: number;

    @ManyToOne(() => Room, room => room.id)
    @JoinColumn()
    room_id: Room;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user_id: User;

    @Column({
        type: "varchar"
    })
    message: string;

}
