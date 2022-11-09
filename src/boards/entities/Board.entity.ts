import { User } from "src/auth/entities/User.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { BoardStatus } from "src/boards/board-status-enum";
import { Comment } from "src/comments/entities/Comment.entity";
import { Category } from "src/category/entities/Category.entity";

@Entity()
export class Board {
  @PrimaryColumn({ type: "uuid" })
  id: string;

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

  @OneToMany(() => Comment, comment => comment.board, { cascade: true, eager: false })
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
