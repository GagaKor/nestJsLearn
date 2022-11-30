import { LoggerService } from '@nestjs/common';
export declare class AppController {
    private readonly logger;
    constructor(logger: LoggerService);
    home(): string;
}
