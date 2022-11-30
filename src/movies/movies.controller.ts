import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/dto/update-movie.dto';
import { Movie } from 'src/movies/entities/Movie.entity';
import { MoviesService } from 'src/movies/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll(); //"This will return all movies";
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `영화 검색 년도 : ${searchingYear}`;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) movieId: string): Promise<Movie> {
    return this.moviesService.findOne(movieId); //`This will return one movie with the id ${id}`;
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) movieId: string) {
    // return `This will delete a movie with the id ${movieId}`
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(':id')
  path(
    @Param('id', ParseIntPipe) movieId: string,
    @Body() updateDate: UpdateMovieDto,
  ) {
    return this.moviesService.update(movieId, updateDate);
  }
}
