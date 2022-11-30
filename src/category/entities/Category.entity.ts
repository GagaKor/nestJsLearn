import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from 'src/boards/entities/Board.entity';

@Entity()
export class Category extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ unique: true })
  categoryName: string;

  @OneToMany(() => Board, (board) => board.category, {
    cascade: true,
    eager: false,
  })
  @JoinTable({ name: 'boardId' })
  board: Board[];

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: Date;
}
