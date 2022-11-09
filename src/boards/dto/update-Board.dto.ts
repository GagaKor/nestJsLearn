import { PartialType } from "@nestjs/mapped-types";
import { CreateBaordDto } from "./create-Board.Dto";

export class UpdateBoardDto extends PartialType(CreateBaordDto) {}
