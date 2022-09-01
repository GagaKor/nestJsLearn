import { User } from "src/auth/entities/User.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "../board-status-enum";

@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  status: BoardStatus;

  @ManyToOne(() => User, user => user.boards, { onDelete: "CASCADE", eager: false })
  user: User;
}
