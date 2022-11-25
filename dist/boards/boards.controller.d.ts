import { DeleteResult } from "typeorm";
import { BoardStatus } from "src/boards/board-status-enum";
import { BoardsService } from "src/boards/boards.service";
import { CreateBaordDto } from "src/boards/dto/create-board.dto";
import { UpdateBoardDto } from "src/boards/dto/update-board.dto";
import { Board } from "src/boards/entities/Board.entity";
import { User } from "src/auth/entities/User.entity";
export declare class BoardsController {
    private readonly boardsService;
    private logger;
    constructor(boardsService: BoardsService);
    findAll(): Promise<Board[]>;
    getAllUserBoard(user: User): Promise<Board[]>;
    findByTitleOrContent(data: string, categoryId: string): Promise<Board[]>;
    findById(id: string): Promise<Board>;
    create(createBoardDto: CreateBaordDto, user: User): Promise<Board>;
    update(id: string, updateBoardDto: UpdateBoardDto, user: User): Promise<boolean>;
    updateStatus(id: string, status: BoardStatus, user: User): Promise<Board>;
    delete(id: string, user: User): Promise<DeleteResult>;
}
