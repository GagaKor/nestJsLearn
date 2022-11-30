import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from 'src/movies/dto/create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
