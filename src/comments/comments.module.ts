import { Module } from '@nestjs/common';
import { CommentsController } from 'src/comments/comments.controller';
import { CommentsService } from 'src/comments/comments.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/comments/entities/Comment.entity';
import { BoardsModule } from 'src/boards/boards.module';

@Module({
  imports: [AuthModule, BoardsModule, TypeOrmModule.forFeature([Comment])],
  exports: [CommentsService],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
