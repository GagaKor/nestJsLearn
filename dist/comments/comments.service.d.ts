import { CreateCommnetDto } from 'src/comments/dto/create-Comment.dto';
import { User } from 'src/auth/entities/User.entity';
import { BoardsService } from 'src/boards/boards.service';
import { UpdateCommnetDto } from 'src/comments/dto/update-Comment.dto';
import { Repository } from 'typeorm';
import { Comment } from './entities/Comment.entity';
export declare class CommentsService {
    private readonly commentsRepository;
    private readonly boardsService;
    constructor(commentsRepository: Repository<Comment>, boardsService: BoardsService);
    create(createCommnetDto: CreateCommnetDto, user: User): Promise<void>;
    updateComment(id: string, updateCommnetDto: UpdateCommnetDto, user: User): Promise<void>;
    deleteComment(id: string, user: User): Promise<void>;
}
