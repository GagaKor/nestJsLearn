import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { DeleteResult } from "typeorm";
import { BoardStatus } from "./board-status-enum";
import { BoardsService } from "./boards.service";
import { CreateBaordDto } from "./dto/create-Board.Dto";
import { UpdateBoardDto } from "./dto/update-Board.dto";
import { Board } from "./entities/Board.entity";
import { BoardStatusValidationPipe } from "./Pipes/boardsStatusValidation.pipe";
@Controller("boards")
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(): Promise<Board[]> {
    return this.boardsService.findAll();
  }

  @Get("search")
  findOneById(@Query("data") data: string): Promise<Board[]> {
    return this.boardsService.findByTitleOrContent(data);
  }

  @Post()
  create(@Body() createBoardDto: CreateBaordDto):Promise<Board> {
    const checkStatus = createBoardDto.status.toUpperCase();
    if (checkStatus !== "PUBLIC" && checkStatus !== "PRIVATE") {
      throw new BadRequestException("Invalid status value.");
    }
    return this.boardsService.create(createBoardDto);
  }

  @Patch(":id")
  update(@Param("id") id: number, @Body() updateBoardDto: UpdateBoardDto) :Promise<boolean> {
    const checkStatus = updateBoardDto.status.toUpperCase();
    if (checkStatus !== "PUBLIC" && checkStatus !== "PRIVATE") {
      throw new BadRequestException("Invalid status value.");
    }
    return this.boardsService.update(id, updateBoardDto);
  }
  @Patch("status/:id")
  updateStatus(@Param("id") id: number, @Body("status" , BoardStatusValidationPipe) status: BoardStatus):Promise<Board> {
    return this.boardsService.updateStatus(id, status);
  } 

  @Delete(":id")
  delete(@Param('id')id : number) : Promise<DeleteResult>{
    return this.boardsService.delete(id);
  }
}
