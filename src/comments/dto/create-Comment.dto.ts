import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommnetDto {
  @IsNotEmpty()
  @IsString()
  readonly comment: string;

  @IsNotEmpty()
  @IsNumber()
  readonly boardId: string;
}
