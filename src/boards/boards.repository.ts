import { User } from 'src/auth/entities/User.entity';
import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { CreateBaordDto } from 'src/boards/dto/create-board.dto';
import { Board } from 'src/boards/entities/Board.entity';
import { Category } from 'src/category/entities/Category.entity';
import { v4 as uuid } from 'uuid';
@CustomRepository(Board)
export class BoardsRepository extends Repository<Board> {
  async createBoard(
    createBaordDto: CreateBaordDto,
    user: User,
    category: Category,
  ): Promise<Board> {
    const { title, content, status } = createBaordDto;

    const board = this.create({
      id: uuid(),
      title,
      content,
      status,
      user,
      category,
    });

    await this.save(board);
    return board;
  }
}
