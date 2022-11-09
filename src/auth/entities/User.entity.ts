import { Exclude } from "class-transformer";
import { Board } from "src/boards/entities/Board.entity";
import { Comment } from "src/comments/entities/Comment.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Role } from "src/auth/role.enum";
import { Lotto } from "src/lotto/entities/Lotto.entity";

@Entity()
@Unique(["username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @OneToMany(() => Board, board => board.user, { cascade: true, eager: false })
  boards: Board[];

  @OneToMany(() => Comment, comment => comment.user, { cascade: true, eager: false })
  comment: Comment[];

  // @OneToMany(() => Lotto, lotto => lotto.user, { cascade: true, eager: false })
  // lottos: Lotto[];

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}
