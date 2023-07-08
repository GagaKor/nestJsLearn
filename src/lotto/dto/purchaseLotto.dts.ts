import { IsArray, IsString } from 'class-validator';

export class PurchaseLottoDto {
  @IsArray()
  lottos: number[][];
  @IsString()
  lottoId: string;
  @IsString()
  lottoPw: string;
}
