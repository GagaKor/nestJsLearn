import {
  Controller,
  Get,
  Logger,
  Query,
  Param,
  Post,
  Body,
  UseGuards,
  Patch,
  NotFoundException,
  UnauthorizedException,
  Delete,
} from '@nestjs/common';
import { TwelService } from './twel.service';
import { CreateTwelDto } from './dto/create-twel.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/auth/entities/User.entity';
import { UpdateTwelDto } from './dto/update-twel.dto';

@Controller('twel')
export class TwelController {
  private logger = new Logger('TWeL');
  constructor(private readonly twelService: TwelService) {}

  @Get()
  async findAll(@Query('category') category: string) {
    return this.twelService.findAll(category);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.twelService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async createTwel(
    @Body() createTwelDto: CreateTwelDto,
    @GetUser() user: User,
  ) {
    return this.twelService.create(createTwelDto, user);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTwelDto: UpdateTwelDto,
    @GetUser() user: User,
  ) {
    const twel = await this.twelService.findById(id);
    if (!twel) {
      throw NotFoundException;
    }
    if (twel.user.id !== user.id) {
      throw UnauthorizedException;
    }

    const { category, title, content } = updateTwelDto;

    twel.category = category;
    twel.title = title;
    twel.content = content;

    return this.twelService.update(twel);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @GetUser() user: User) {
    const twel = await this.twelService.findById(id);
    if (!twel) {
      throw NotFoundException;
    }
    if (twel.user.id !== user.id) {
      throw UnauthorizedException;
    }

    return this.twelService.delete(id);
  }
}
