import { User } from 'src/auth/entities/User.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BoardStatus } from 'src/boards/board-status-enum';
import { CreateBaordDto } from 'src/boards/dto/create-board.dto';
import { UpdateBoardDto } from 'src/boards/dto/update-board.dto';
import { Board } from 'src/boards/entities/Board.entity';
import { CategoryService } from 'src/category/category.service';
import { GetBoard } from './dto/get-board.dto';
export declare class BoardsService {
    private readonly boardRepository;
    private readonly categoryService;
    constructor(boardRepository: Repository<Board>, categoryService: CategoryService);
    findAll(getBoard: GetBoard): Promise<{
        boards: Board[];
        count: number;
    }>;
    totalBoardCount(categoryId: string): Promise<number>;
    findById(id: string): Promise<Board>;
    getAllUserBoard(user: User): Promise<Board[]>;
    findByTitleOrContent(data: string, categoryId: string): Promise<Board[]>;
    create(createBaordDto: CreateBaordDto, user: User): Promise<Board>;
    update(id: string, updateBoardDto: UpdateBoardDto, user: User): Promise<boolean>;
    updateStatus(id: string, status: BoardStatus, user: User): Promise<Board>;
    delete(id: string, user: User): Promise<DeleteResult>;
}
