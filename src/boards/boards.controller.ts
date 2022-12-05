import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { BoardStatus } from 'src/boards/board-status-enum';
import { BoardsService } from 'src/boards/boards.service';
import { CreateBaordDto } from 'src/boards/dto/create-board.dto';
import { UpdateBoardDto } from 'src/boards/dto/update-board.dto';
import { Board } from 'src/boards/entities/Board.entity';
import { BoardStatusValidationPipe } from 'src/boards/Pipes/boardsStatusValidation.pipe';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/auth/entities/User.entity';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { GetBoard } from './dto/get-board.dto';
@Controller('boards')
export class BoardsController {
  private logger = new Logger('Boards');
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAll(
    @Query('categoryId') categoryId: string,
    @Query('page') page: number,
    @Query('take') take: number,
  ): Promise<{
    boards: Board[];
    count: number;
  }> {
    const getBoard: GetBoard = { categoryId, page, take };
    return await this.boardsService.findAll(getBoard);
  }

  @Get('myBoard')
  @UseGuards(AuthGuard)
  getAllUserBoard(@GetUser() user: User): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllUserBoard(user);
  }

  @Get('search')
  findByTitleOrContent(
    @Query('data') data: string,
    @Query('categoryId') categoryId: string,
  ): Promise<Board[]> {
    return this.boardsService.findByTitleOrContent(data, categoryId);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: string): Promise<Board> {
    return this.boardsService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  create(
    @Body() createBoardDto: CreateBaordDto,
    @GetUser() user: User,
  ): Promise<Board> {
    this.logger.verbose(`User ${user.username} creating a new board. 
    Payload : ${JSON.stringify(createBoardDto)}`);
    const checkStatus = createBoardDto.status.toUpperCase();
    if (checkStatus !== 'PUBLIC' && checkStatus !== 'PRIVATE') {
      throw new BadRequestException('Invalid status value.');
    }
    return this.boardsService.create(createBoardDto, user);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @GetUser() user: User,
  ): Promise<boolean> {
    this.logger.verbose(`User ${user.username} updating a id:${id} board. 
    Payload : ${JSON.stringify(updateBoardDto)}`);
    const checkStatus = updateBoardDto.status.toUpperCase();
    if (checkStatus !== 'PUBLIC' && checkStatus !== 'PRIVATE') {
      throw new BadRequestException('Invalid status value.');
    }
    return this.boardsService.update(id, updateBoardDto, user);
  }
  @Patch('status/:id')
  @UseGuards(AuthGuard)
  updateStatus(
    @Param('id', ParseIntPipe) id: string,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.updateStatus(id, status, user);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(
    @Param('id', ParseIntPipe) id: string,
    @GetUser() user: User,
  ): Promise<DeleteResult> {
    return this.boardsService.delete(id, user);
  }
}
