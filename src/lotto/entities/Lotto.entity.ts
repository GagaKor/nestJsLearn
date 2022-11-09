import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { User } from "src/auth/entities/User.entity";

@Entity()
export class Lotto {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column("simple-array")
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
