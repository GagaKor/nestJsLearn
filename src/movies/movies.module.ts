import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "src/movies/entities/Movie.entity";
import { MoviesController } from "src/movies/movies.controller";
import { MoviesService } from "src/movies/movies.service";

@Module({
  imports:[TypeOrmModule.forFeature([Movie])],
  exports:[TypeOrmModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
