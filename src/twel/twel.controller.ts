import { Controller, Logger } from '@nestjs/common';
import { TwelService } from './twel.service';

@Controller('twel')
export class TwelController {
  private logger = new Logger('TWeL');
  constructor(private readonly twelService: TwelService) {}
}
