import {
  Controller,
  Get,
  Logger,
  Query,
  Param,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { TwelService } from './twel.service';
import { CreateTwelDto } from './dto/create-twel.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { GetUser } from 'src/decorator/get-user.decorator';

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
}
