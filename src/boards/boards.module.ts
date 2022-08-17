import { Module } from "@nestjs/common";
import { getDataSourceToken, getRepositoryToken, TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { Board } from "./entities/Board.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  exports: [TypeOrmModule],
  controllers: [BoardsController],
  providers: [
    {
      provide: getRepositoryToken(Board),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource.getRepository(Board);
      },
    },
    BoardsService,
  ],
})
export class BoardsModule {}
