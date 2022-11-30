import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateLottoDto {
  @IsNumber()
  playGame: number;

  @IsArray()
  include?: number[];

  @IsArray()
  exclude?: number[];

  @IsNumber()
  deviation: number;

  @IsString()
  consecution: string;

  @IsNumber()
  max: number;

  @IsNumber()
  min: number;
}
