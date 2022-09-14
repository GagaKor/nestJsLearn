import { User } from "src/auth/entities/User.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BoardStatus } from "../board-status-enum";
import { Comment } from "src/comments/entities/Comment.entity";

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

  @OneToMany(() => Comment, comment => comment.board, { cascade: true, eager: true })
  comment: Comment[];
}
