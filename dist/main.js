"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_config_1 = require("./configs/logger.config");
const cookieParser = require("cookie-parser");
async function bootstrap() {
    const logger = new common_1.Logger();
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
        logger: logger_config_1.winstonLogger,
    });
    app.use(cookieParser());
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    logger.log(`------------${process.env.NODE_ENV} App Listening at localhost:${port}------------`);
}
bootstrap();
//# sourceMappingURL=main.js.map