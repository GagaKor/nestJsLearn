import { BadRequestException, Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { BoardStatus } from "./board-status-enum";
import { BoardsService } from "./boards.service";
import { CreateBaordDto } from "./dto/create-Board.Dto";
import { UpdateBoardDto } from "./dto/update-Board.dto";
import { Board } from "./entities/Board.entity";
import { BoardStatusValidationPipe } from "./Pipes/boardsStatusValidation.pipe";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/entities/User.entity";
@Controller("boards")
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }
  @Get(":id")
  findById(@Param("id", ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.findById(id);
  }

  @Get("myBoard")
  getAllUserBoard(@GetUser() user: User): Promise<Board[]> {
    console.log(user);
    return this.boardsService.getAllUserBoard(user);
  }

  @Get("search")
  findOneById(@Query("data") data: string): Promise<Board[]> {
    return this.boardsService.findByTitleOrContent(data);
  }

  @Post()
  create(@Body() createBoardDto: CreateBaordDto, @GetUser() user: User): Promise<Board> {
    const checkStatus = createBoardDto.status.toUpperCase();
    if (checkStatus !== "PUBLIC" && checkStatus !== "PRIVATE") {
      throw new BadRequestException("Invalid status value.");
    }
    return this.boardsService.create(createBoardDto, user);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() updateBoardDto: UpdateBoardDto): Promise<boolean> {
    const checkStatus = updateBoardDto.status.toUpperCase();
    if (checkStatus !== "PUBLIC" && checkStatus !== "PRIVATE") {
      throw new BadRequestException("Invalid status value.");
    }
    return this.boardsService.update(id, updateBoardDto);
  }
  @Patch("status/:id")
  updateStatus(@Param("id", ParseIntPipe) id: number, @Body("status", BoardStatusValidationPipe) status: BoardStatus): Promise<Board> {
    return this.boardsService.updateStatus(id, status);
  }

  @Delete(":id")
  delete(@Param("id", ParseIntPipe) id: number): Promise<DeleteResult> {
    return this.boardsService.delete(id);
  }
}
