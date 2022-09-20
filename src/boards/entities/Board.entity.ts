import { User } from "src/auth/entities/User.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BoardStatus } from "../board-status-enum";
import { Comment } from "src/comments/entities/Comment.entity";
import { Category } from "src/category/entities/Category.entity";

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

  @ManyToOne(() => Category, category => category.board, { onDelete: "CASCADE", eager: false })
  category: Category;

  @ManyToOne(() => User, user => user.boards, { onDelete: "CASCADE", eager: false })
  @JoinTable({ name: "boardId" })
  user: User;

  @OneToMany(() => Comment, comment => comment.board, { cascade: true, eager: true })
  comment: Comment[];

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}
