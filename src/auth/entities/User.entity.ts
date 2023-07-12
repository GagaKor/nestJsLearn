import { Exclude } from 'class-transformer';
import { Board } from 'src/boards/entities/Board.entity';
import { Comment } from 'src/comments/entities/Comment.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from 'src/auth/role.enum';
import { LottoUser } from 'src/lotto/entities/LottoUser.entity';
import { Twel } from './../../twel/entities/Twel.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role: Role;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @OneToMany(() => Board, (board) => board.user, {
    cascade: true,
    eager: false,
  })
  boards: Board[];

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
    eager: false,
  })
  comment: Comment[];

  @OneToMany(() => Twel, (twel) => twel.user, {
    cascade: true,
    eager: false,
  })
  twels: Twel[];

  @OneToMany(() => LottoUser, (lottoUser) => lottoUser.user, {
    cascade: true,
    eager: false,
  })
  lottos: LottoUser[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
