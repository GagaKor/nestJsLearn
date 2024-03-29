import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/auth/entities/User.entity';
import { DeleteResult, Like, Repository } from 'typeorm';
import { BoardStatus } from 'src/boards/board-status-enum';
import { CreateBaordDto } from 'src/boards/dto/create-board.dto';
import { UpdateBoardDto } from 'src/boards/dto/update-board.dto';
import { Board } from 'src/boards/entities/Board.entity';
import { CategoryService } from 'src/category/category.service';
import { GetBoard } from './dto/get-board.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly categoryService: CategoryService,
  ) {}

  async findAll(getBoard: GetBoard): Promise<{
    boards: Board[];
    count: number;
  }> {
    const { categoryId, page, take } = getBoard;
    const status = BoardStatus.PUBLIC;
    const count = await this.totalBoardCount(categoryId);
    const boards = await this.boardRepository.find({
      where: { status },
      relations: { user: true, category: true },
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        user: { username: true },
        category: { categoryName: true },
      },
      take: take,
      skip: (page - 1) * take,
      order: {
        createdAt: 'DESC',
      },
    });
    return {
      boards,
      count,
    };
  }

  async totalBoardCount(categoryId: string) {
    return await this.boardRepository.count({
      where: { category: { id: categoryId } },
    });
  }

  async findById(id: string): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: { id },
      relations: { user: true, category: true, comment: true },
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

  async findByTitleOrContent(
    data: string,
    categoryId: string,
  ): Promise<Board[]> {
    let result: Board[];
    if (categoryId) {
      result = await this.boardRepository.find({
        where: [
          { title: Like(`%${data}%`), category: { id: categoryId } },
          { content: Like(`%${data}%`), category: { id: categoryId } },
        ],
        relations: { user: true, category: true },
        select: { user: { username: true }, category: { categoryName: true } },
      });
    } else {
      result = await this.boardRepository.find({
        where: [{ title: Like(`%${data}%`) }, { content: Like(`%${data}%`) }],
        relations: { user: true, category: true },
        select: { user: { username: true }, category: { categoryName: true } },
      });
    }
    return result;
  }
  async create(createBaordDto: CreateBaordDto, user: User): Promise<Board> {
    const { categoryId } = createBaordDto;
    const category = await this.categoryService.findById(categoryId);

    const { title, content, status } = createBaordDto;

    const board = Board.create({
      id: uuid(),
      title,
      content,
      status,
      user,
      category,
    });

    return await this.boardRepository.save(board);
  }
  async update(
    id: string,
    updateBoardDto: UpdateBoardDto,
    user: User,
  ): Promise<boolean> {
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .update()
      .set(updateBoardDto)
      .where('id=:id AND userId = :userId', { id, userId: user.id })
      .execute();
    return result.affected > 0;
  }
  async updateStatus(
    id: string,
    status: BoardStatus,
    user: User,
  ): Promise<Board> {
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .where('id = :id AND userId = :userId', { id, userId: user.id })
      .getOne();
    board.status = status;
    const result = await this.boardRepository.save(board);
    return result;
  }
  async delete(id: string, user: User): Promise<DeleteResult> {
    const result = await this.boardRepository
      .createQueryBuilder('board')
      .delete()
      .where('id=:id AND userId = :userId', { id, userId: user.id })
      .execute();

    if (result.affected === 0) throw new NotFoundException(`Can't find ${id}`);

    return result;
  }
}
