import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Movie } from './entities/Movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll() : Movie[]{
        return this.moviesService.getAll();//"This will return all movies";
    }

    @Get("search")
    search(@Query('year') searchingYear : string){
        return `영화 검색 년도 : ${searchingYear}`
    }
    
    @Get(':id')
    getOne(@Param('id') movieId: string):Movie{
        return  this.moviesService.getOne(movieId) //`This will return one movie with the id ${id}`;
    }

    @Post()
    create(@Body() movieData){
       return this.moviesService.create(movieData);
    }
    
    @Delete(':id')
    remove(@Param('id') movieId:string){
        // return `This will delete a movie with the id ${movieId}`
        return this.moviesService.deleteOne(movieId);
    }

    @Patch(':id')
    path(@Param('id') movieId : string, @Body() updateDate){
        return {
            updateMovie : movieId,
            ...updateDate
        } //`This will Patch a movie with the id ${movieId}`
    }

}
