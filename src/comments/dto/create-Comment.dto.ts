import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommnetDto {
  @IsNotEmpty()
  @IsString()
  readonly comment: string;

  @IsNotEmpty()
  readonly boardId: number;
}
