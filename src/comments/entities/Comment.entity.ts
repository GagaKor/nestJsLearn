import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/auth/entities/User.entity";
import { Board } from "src/boards/entities/Board.entity";

@Entity()
export class Comment {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  comment: string;

  @Column()
  username: string;

  @ManyToOne(() => User, user => user.comment, { onDelete: "CASCADE", eager: false })
  user: User;

  @ManyToOne(() => Board, board => board.comment, { onDelete: "CASCADE", eager: false })
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
