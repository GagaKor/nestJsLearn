import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { Movie } from "./entities/Movie.entity";
import { MoviesService } from "./movies.service";

@Controller("movies")
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  findAll(): Promise<Movie[]> {
    return this.moviesService.findAll(); //"This will return all movies";
  }

  @Get("search")
  search(@Query("year") searchingYear: number) {
    return `영화 검색 년도 : ${searchingYear}`;
  }

  @Get(":id")
  findOne(@Param("id") movieId: number): Promise<Movie> {
    return this.moviesService.findOne(movieId); //`This will return one movie with the id ${id}`;
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @Delete(":id")
  remove(@Param("id") movieId: number) {
    // return `This will delete a movie with the id ${movieId}`
    return this.moviesService.deleteOne(movieId);
  }

  @Patch(":id")
  path(@Param("id") movieId: number, @Body() updateDate: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateDate);
  }
}
