import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./entities/Movie.entity";
import { MoviesController } from "./movies.controller";
import { MoviesService } from "./movies.service";

@Module({
  imports:[TypeOrmModule.forFeature([Movie])],
  exports:[TypeOrmModule],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
