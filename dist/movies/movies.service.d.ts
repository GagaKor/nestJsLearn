import { Repository } from 'typeorm';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/dto/update-movie.dto';
import { Movie } from 'src/movies/entities/Movie.entity';
export declare class MoviesService {
    private movieRepository;
    constructor(movieRepository: Repository<Movie>);
    findAll(): Promise<Movie[]>;
    findOne(id: string): Promise<Movie>;
    deleteOne(id: string): Promise<void>;
    create(Movie: CreateMovieDto): Promise<void>;
    update(id: string, updateData: UpdateMovieDto): Promise<void>;
}
