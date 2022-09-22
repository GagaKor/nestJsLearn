import { Controller, Get, Logger, LoggerService, Ip } from "@nestjs/common";
import { Inject } from "@nestjs/common/decorators";
@Controller("")
export class AppController {
  constructor(@Inject(Logger) private readonly logger: LoggerService) {}

  @Get()
  home() {
    const msg = `Welecome`;
    return msg;
  }
}
