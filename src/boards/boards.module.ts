import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './entiies/Board.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Board])],
  exports:[TypeOrmModule],
  controllers: [BoardsController],
  providers: [BoardsService]
})
export class BoardsModule {}
