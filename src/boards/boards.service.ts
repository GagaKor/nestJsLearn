import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "src/auth/entities/User.entity";
import { DeleteResult, Like } from "typeorm";
import { BoardStatus } from "./board-status-enum";
import { BoardsRepository } from "./boards.repository";
import { CreateBaordDto } from "./dto/create-Board.Dto";
import { UpdateBoardDto } from "./dto/update-Board.dto";
import { Board } from "./entities/Board.entity";
import { CategoryService } from "src/category/category.service";

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardsRepository, private readonly categoryService: CategoryService) {}

  async findAll(): Promise<Board[]> {
    const status = BoardStatus.PUBLIC;
    return await this.boardRepository.find({
      where: { status },
      relations: { user: true, category: true },
      select: { user: { username: true }, category: { categoryName: true } },
    });
  }
  async findById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: { id },
      relations: { user: true, category: true },
      select: { user: { username: true }, category: { categoryName: true } },
    });
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    return found;
  }

  async getAllUserBoard(user: User): Promise<Board[]> {
    const boards = await this.boardRepository.find({
      where: { user: { username: user.username } },
      relations: { user: true, category: true },
      select: { user: { username: true }, category: { categoryName: true } },
    });
    return boards;
  }

  async findByTitleOrContent(data: string): Promise<Board[]> {
    return await this.boardRepository.find({
      where: [{ title: Like(`%${data}%`) }, { content: Like(`%${data}%`) }],
      relations: { user: true, category: true },
      select: { user: { username: true }, category: { categoryName: true } },
    });
  }
  async create(createBaordDto: CreateBaordDto, user: User): Promise<Board> {
    const { categoryId } = createBaordDto;
    const category = await this.categoryService.findById(categoryId);
    return await this.boardRepository.createBoard(createBaordDto, user, category);
  }
  async update(id: number, updateBoardDto: UpdateBoardDto, user: User): Promise<boolean> {
    const result = await this.boardRepository.createQueryBuilder("board").update().set(updateBoardDto).where("id=:id AND userId = :userId", { id, userId: user.id }).execute();
    return result.affected > 0;
  }
  async updateStatus(id: number, status: BoardStatus, user: User): Promise<Board> {
    const board = await this.boardRepository.createQueryBuilder("board").where("id = :id AND userId = :userId", { id, userId: user.id }).getOne();
    board.status = status;
    const result = await this.boardRepository.save(board);
    return result;
  }
  async delete(id: number, user: User): Promise<DeleteResult> {
    const result = await this.boardRepository.createQueryBuilder("board").delete().where("id=:id AND userId = :userId", { id, userId: user.id }).execute();

    if (result.affected === 0) throw new NotFoundException(`Can't find ${id}`);

    return result;
  }
}
