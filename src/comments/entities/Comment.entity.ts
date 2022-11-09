import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/auth/entities/User.entity";
import { Board } from "src/boards/entities/Board.entity";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  username: string;

  @ManyToOne(() => User, user => user.comment, { onDelete: "CASCADE", eager: false })
  @JoinTable({ name: "commandId" })
  user: User;

  @ManyToOne(() => Board, board => board.comment, { onDelete: "CASCADE", eager: false })
  @JoinTable({ name: "commandId" })
  board: Board;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}
