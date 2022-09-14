import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/auth/entities/User.entity";
import { Board } from "./../../boards/entities/Board.entity";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @ManyToOne(() => User, user => user.comment, { onDelete: "CASCADE", eager: false })
  user: User;

  @ManyToOne(() => Board, board => board.comment, { onDelete: "CASCADE", eager: false })
  board: Board;
}
