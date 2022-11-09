import { User } from "src/auth/entities/User.entity";
import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { CreateBaordDto } from "./dto/create-Board.Dto";
import { Board } from "./entities/Board.entity";
import { Category } from "src/category/entities/Category.entity";

@CustomRepository(Board)
export class BoardsRepository extends Repository<Board> {
  async createBoard(createBaordDto: CreateBaordDto, user: User, category: Category): Promise<Board> {
    const { title, content, status } = createBaordDto;

    const board = this.create({
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
