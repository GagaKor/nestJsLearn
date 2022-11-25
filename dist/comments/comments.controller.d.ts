import { CreateCommnetDto } from "src/comments/dto/create-Comment.dto";
import { User } from "src/auth/entities/User.entity";
import { CommentsService } from "src/comments/comments.service";
import { UpdateCommnetDto } from "src/comments/dto/update-Comment.dto";
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    createComment(createCommentDto: CreateCommnetDto, user: User): Promise<void>;
    updateComment(id: string, updateCommnetDto: UpdateCommnetDto, user: User): Promise<void>;
    deleteComment(id: string, user: User): Promise<void>;
}
