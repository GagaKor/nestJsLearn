import { BaseEntity, Column, CreateDateColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/auth/entities/User.entity";

export class Lotto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  myLotto: number[];

  // @ManyToOne(() => User, user => user.lottos, { onDelete: "CASCADE", eager: false })
  // user: User;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}
