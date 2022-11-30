import { User } from 'src/auth/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateBaordDto } from 'src/boards/dto/create-board.dto';
import { Board } from 'src/boards/entities/Board.entity';
import { Category } from 'src/category/entities/Category.entity';
export declare class BoardsRepository extends Repository<Board> {
    createBoard(createBaordDto: CreateBaordDto, user: User, category: Category): Promise<Board>;
}
