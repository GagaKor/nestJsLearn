import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }
  @Get('search')
  search(@Query('year') searchingYear) {
    return `We are searching for a movie made after: ${searchingYear}`;
  }
  @Get('/:id')
  getOne(@Param('id') id: string) {
    return `This will return one moive with the id: ${id}`;
  }

  @Post()
  create(@Body() movieData) {
    return movieData;
  }
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `This will delete a movie with the id: ${id}`;
  }
  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return {
      updatedMovie: id,
      ...updateData,
    };
  }
}
