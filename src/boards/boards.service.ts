import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like } from "typeorm";
import { BoardStatus } from "./board-status-enum";
import { BoardsRepository } from "./boards.repository";
import { CreateBaordDto } from "./dto/create-Board.Dto";
import { UpdateBoardDto } from "./dto/update-Board.dto";
import { Board } from "./entities/Board.entity";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: BoardsRepository,
  ) {}

  findAll(): Promise<Board[]> {
    return this.boardRepository.find();
  }
  async findById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }
  findByTitleOrContent(data: string): Promise<Board[]> {
    return this.boardRepository.find({
      where: [{ title: Like(`%${data}%`) }, { content: Like(`%${data}%`) }],
    });
  }
  async create(createBaordDto: CreateBaordDto): Promise<Board> {
    const result = await this.boardRepository.save(createBaordDto);
    return result;
  }
  async update(id: number, updateBoardDto: UpdateBoardDto): Promise<boolean> {
    const result = await this.boardRepository.update(id, updateBoardDto);
    return result.affected > 0;
  }
  async updateStatus(id: number, status: BoardStatus) {
    const board = await this.findById(id);
    board.status = status;
    const result = await this.boardRepository.save(board);
    console.log(result);
  }
}
