import { BaseEntity } from 'typeorm';
import { Board } from 'src/boards/entities/Board.entity';
export declare class Category extends BaseEntity {
    id: string;
    categoryName: string;
    board: Board[];
    createdAt: Date;
    updatedAt: Date;
}
