import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Board } from "src/boards/entities/Board.entity";

@Entity()
export class Category {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ unique: true })
  categoryName: string;

  @OneToMany(() => Board, board => board.category, { cascade: true, eager: false })
  board: Board[];

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}
