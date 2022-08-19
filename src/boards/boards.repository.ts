import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { Board } from "./entities/Board.entity";

@CustomRepository(Board)
export class BoardsRepository extends Repository<Board>{
  

}