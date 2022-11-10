import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/auth/entities/User.entity";

@Entity()
export class LottoUser extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  myLotto: string;

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
