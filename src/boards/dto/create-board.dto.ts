import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { BoardStatus } from 'src/boards/board-status-enum';

export class CreateBaordDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  readonly status: BoardStatus;

  @IsNotEmpty()
  @IsString()
  readonly categoryId: string;
}
