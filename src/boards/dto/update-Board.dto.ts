import { PartialType } from "@nestjs/mapped-types";
import { CreateBaordDto } from "src/boards/dto/create-Board.Dto";

export class UpdateBoardDto extends PartialType(CreateBaordDto) {}
