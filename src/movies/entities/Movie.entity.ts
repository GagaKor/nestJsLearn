import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie{
    @PrimaryColumn({type:"uuid"})
    id:string;
    
    @Column()
    title:string;
    @Column()

    year:number;
    @Column()
    genres : string;
}