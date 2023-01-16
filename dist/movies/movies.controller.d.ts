import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';
import { UpdateMovieDto } from 'src/movies/dto/update-movie.dto';
import { Movie } from 'src/movies/entities/Movie.entity';
import { MoviesService } from 'src/movies/movies.service';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAll(): Promise<Movie[]>;
    search(searchingYear: string): string;
    findOne(movieId: string): Promise<Movie>;
    create(movieData: CreateMovieDto): Promise<void>;
    remove(movieId: string): Promise<void>;
    path(movieId: string, updateDate: UpdateMovieDto): Promise<void>;
}
