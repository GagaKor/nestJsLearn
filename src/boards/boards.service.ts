import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/auth/entities/User.entity";
import { DeleteResult, Like } from "typeorm";
import { BoardStatus } from "./board-status-enum";
import { BoardsRepository } from "./boards.repository";
import { CreateBaordDto } from "./dto/create-Board.Dto";
import { UpdateBoardDto } from "./dto/update-Board.dto";
import { Board } from "./entities/Board.entity";

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardsRepository) {}

  async findAll(): Promise<Board[]> {
    return await this.boardRepository.find();
  }
  async findById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async getAllUserBoard(user: User): Promise<Board[]> {
    const query = this.boardRepository.createQueryBuilder("board");

    query.where("board.userId = :", { userId: user.id });

    const boards = await query.getMany();

    return boards;
  }

  async findByTitleOrContent(data: string): Promise<Board[]> {
    return await this.boardRepository.find({
      where: [{ title: Like(`%${data}%`) }, { content: Like(`%${data}%`) }],
    });
  }
  async create(createBaordDto: CreateBaordDto, user: User): Promise<Board> {
    return await this.boardRepository.createBoard(createBaordDto, user);
  }
  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<boolean> {
    const result = await this.boardRepository.update(id, updateBoardDto);
    return result.affected > 0;
  }
  async updateStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.findById(id);
    board.status = status;
    const result = await this.boardRepository.save(board);
    return result;
  }
  async delete(id: number): Promise<DeleteResult> {
    const result = await this.boardRepository.delete(id);

    if (result.affected === 0) throw new NotFoundException(`Can't find ${id}`);

    return result;
  }
}
