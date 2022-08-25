import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmExModule } from "src/configs/typeorm-ex.module";
import { BoardsController } from "./boards.controller";
import { BoardsRepository } from "./boards.repository";
import { BoardsService } from "./boards.service";
import { Board } from "./entities/Board.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Board]), TypeOrmExModule.forCustomRepository([BoardsRepository])],
  exports: [BoardsService],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
