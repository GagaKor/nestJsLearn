import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from "./create-Category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
