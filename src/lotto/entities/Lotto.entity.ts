import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Lotto extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  round: number;

  @Column()
  lotto_number: string;
}
