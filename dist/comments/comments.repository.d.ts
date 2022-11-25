import { Comment } from "src/comments/entities/Comment.entity";
import { Repository } from "typeorm";
import { User } from "src/auth/entities/User.entity";
import { Board } from "src/boards/entities/Board.entity";
import { UpdateCommnetDto } from "src/comments/dto/update-Comment.dto";
export declare class CommentsRepository extends Repository<Comment> {
    createComment(comment: string, board: Board, user: User): Promise<void>;
    updateComment(id: string, updateCommnetDto: UpdateCommnetDto, user: User): Promise<void>;
    deleteComment(id: string, user: User): Promise<void>;
}
