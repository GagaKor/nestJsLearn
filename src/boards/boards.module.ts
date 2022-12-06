import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BoardsController } from 'src/boards/boards.controller';
import { BoardsService } from 'src/boards/boards.service';
import { Board } from 'src/boards/entities/Board.entity';
import { CategoryModule } from 'src/category/category.module';
@Module({
  imports: [AuthModule, CategoryModule, TypeOrmModule.forFeature([Board])],
  exports: [BoardsService],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
