import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('movies')
export class MoviesController {

    @Get()
    getAll(){
        return "This will return all movies";
    }

    @Get("search")
    search(@Query('year') searchingYear : string){
        return `영화 검색 년도 : ${searchingYear}`
    }
    
    @Get('/:id')
    getOne(@Param('id') id: string){
        return `This will return one movie with the id ${id}`;
    }

    @Post()
    create(@Body() movieData :string){
        console.log(movieData);
        return movieData //"This will create a movie";
    }
    
    @Delete('/:id')
    remove(@Param('id') movieId:string){
        return `This will delete a movie with the id ${movieId}`
    }

    @Patch('/:id')
    path(@Param('id') movieId : string, @Body() updateDate){
        return {
            updateMovie : movieId,
            ...updateDate
        } //`This will Patch a movie with the id ${movieId}`
    }

}
