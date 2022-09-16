import { Exclude } from "class-transformer";
import { Board } from "src/boards/entities/Board.entity";
import { Comment } from "src/comments/entities/Comment.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @OneToMany(() => Board, board => board.user, { cascade: true, eager: false })
  boards: Board[];

  @OneToMany(() => Comment, comment => comment.user, { cascade: true, eager: false })
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
