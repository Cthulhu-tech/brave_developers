import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/modules/user/entities/user.entity";


@Entity("JWT")

export class JWT extends BaseEntity {
    @PrimaryGeneratedColumn({comment: "Primary key JWT"})
    id: number;

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user_id: User;

    @Column({
        type: "varchar"
    })
    token: string;

}
