import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/auth/entities/User.entity";

@Entity()
export class Lotto extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("simple-array")
  myLotto: number[];

  @ManyToOne(() => User, user => user.lottos, { onDelete: "CASCADE", eager: false })
  @JoinTable({ name: "lottoId" })
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
