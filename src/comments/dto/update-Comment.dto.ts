import { PartialType } from "@nestjs/mapped-types";
import { CreateCommnetDto } from "./create-Comment.dto";

export class UpdateCommnetDto extends PartialType(CreateCommnetDto) {}
