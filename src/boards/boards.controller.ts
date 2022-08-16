import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBaordDto } from './dto/create-Board.Dto';
import { Board } from './entiies/Board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService){}

    @Get()
    findAll():Promise<Board[]>{
        return this.boardsService.findAll();
    }

    @Get("search")
    findOneById(@Query("data") data:string):Promise<Board[]>{
        return this.boardsService.findByTitleOrContent(data);
    }

    @Post()
    create(@Body() boardData: CreateBaordDto){
        return this.boardsService.create(boardData);
    }

}
