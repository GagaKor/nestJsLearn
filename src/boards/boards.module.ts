import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmExModule } from "src/database/typeorm-ex.module";
import { BoardsController } from "src/boards/boards.controller";
import { BoardsRepository } from "src/boards/boards.repository";
import { BoardsService } from "src/boards/boards.service";
import { Board } from "src/boards/entities/Board.entity";
import { CategoryModule } from "src/category/category.module";
@Module({
  imports: [AuthModule, CategoryModule, TypeOrmModule.forFeature([Board]), TypeOrmExModule.forCustomRepository([BoardsRepository])],
  exports: [BoardsService],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
