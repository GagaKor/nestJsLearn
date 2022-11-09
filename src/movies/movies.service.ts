import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMovieDto } from "src/movies/dto/create-movie.dto";
import { UpdateMovieDto } from "src/movies/dto/update-movie.dto";
import { Movie } from "src/movies/entities/Movie.entity";

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>
  ){};


  findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  findOne(id: number): Promise<Movie> {
    return this.movieRepository.findOne({
      where : {id}
    });
  }

  async deleteOne(id: number): Promise<void> {
    await this.movieRepository.delete(id);
  }

  async create(Movie: CreateMovieDto): Promise<void> {
    await this.movieRepository.save(Movie);
  }

  async update(id: number, updateData: UpdateMovieDto):Promise<void> {
    await this.movieRepository.update(id, updateData);
  }
}
