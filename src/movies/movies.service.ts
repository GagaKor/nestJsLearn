import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMovieDto } from "src/movies/dto/create-movie.dto";
import { UpdateMovieDto } from "src/movies/dto/update-movie.dto";
import { Movie } from "src/movies/entities/Movie.entity";
import { v4 as uuid } from "uuid";
@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
  ) {}

  findAll(): Promise<Movie[]> {
    return this.movieRepository.find();
  }

  findOne(id: string): Promise<Movie> {
    return this.movieRepository.findOne({
      where: { id },
    });
  }

  async deleteOne(id: string): Promise<void> {
    await this.movieRepository.delete(id);
  }

  async create(Movie: CreateMovieDto): Promise<void> {
    const data = this.movieRepository.create({
      id: uuid(),
      genres: Movie.genres,
      title: Movie.title,
      year: Movie.year,
    });
    await this.movieRepository.save(data);
  }

  async update(id: string, updateData: UpdateMovieDto): Promise<void> {
    await this.movieRepository.update(id, updateData);
  }
}
