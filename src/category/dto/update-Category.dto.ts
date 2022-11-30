import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from 'src/category/dto/create-Category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
