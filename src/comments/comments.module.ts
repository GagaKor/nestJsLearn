import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsService } from "./comments.service";
import { AuthModule } from "./../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./entities/Comment.entity";
import { TypeOrmExModule } from "src/configs/typeorm-ex.module";
import { CommentsRepository } from "./comments.repository";
import { BoardsModule } from "./../boards/boards.module";

@Module({
  imports: [AuthModule, BoardsModule, TypeOrmModule.forFeature([Comment]), TypeOrmExModule.forCustomRepository([CommentsRepository])],
  exports: [CommentsService],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
