import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { BoardStatus } from "../board-status-enum";

export class CreateBaordDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @Transform(param => param.value.toUpperCase())
  readonly status: BoardStatus;
}
