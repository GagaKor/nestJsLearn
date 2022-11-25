import { BaseEntity } from "typeorm";
export declare class Lotto extends BaseEntity {
    id: string;
    round: number;
    lotto_number: string;
}
