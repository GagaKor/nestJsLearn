import { Repository } from "typeorm";
import { Board } from "./entities/Board.entity";

export interface BoardsRepository extends Repository<Board> {
  this: Repository<Board>;
}
