import { PartialType } from '@nestjs/mapped-types';
import { CreateBaordDto } from 'src/boards/dto/create-board.dto';

export class UpdateBoardDto extends PartialType(CreateBaordDto) {}
