import { BaseEntity, Column, CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./../../auth/entities/User.entity";

export class Lotto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  myLotto: number[];

  @ManyToOne(() => User, user => user.lottos)
  user: User;

  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}
