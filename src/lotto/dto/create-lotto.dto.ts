import { IsArray, IsNumber } from "class-validator";

export class CreateLottoDto {
  @IsNumber()
  playGame: number;

  @IsArray()
  include?: number[];

  @IsArray()
  exclude?: number[];
}
