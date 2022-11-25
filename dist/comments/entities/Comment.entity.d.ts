import { BaseEntity } from "typeorm";
import { User } from "src/auth/entities/User.entity";
import { Board } from "src/boards/entities/Board.entity";
export declare class Comment extends BaseEntity {
    id: string;
    comment: string;
    username: string;
    user: User;
    board: Board;
    createdAt: Date;
    updatedAt: Date;
}
