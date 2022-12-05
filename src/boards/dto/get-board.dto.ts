import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetBoard {
  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsNumber()
  @IsNotEmpty()
  page: number;

  @IsNumber()
  @IsNotEmpty()
  take: number;
}
