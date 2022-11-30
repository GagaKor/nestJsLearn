import { PartialType } from '@nestjs/mapped-types';
import { CreateCommnetDto } from 'src/comments/dto/create-Comment.dto';

export class UpdateCommnetDto extends PartialType(CreateCommnetDto) {}
