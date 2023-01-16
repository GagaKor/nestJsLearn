import { User } from 'src/auth/entities/User.entity';
import { BaseEntity } from 'typeorm';
import { BoardStatus } from 'src/boards/board-status-enum';
import { Comment } from 'src/comments/entities/Comment.entity';
import { Category } from 'src/category/entities/Category.entity';
export declare class Board extends BaseEntity {
    id: string;
    title: string;
    content: string;
    status: BoardStatus;
    category: Category;
    user: User;
    comment: Comment[];
    createdAt: Date;
    updatedAt: Date;
}
