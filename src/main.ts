import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as config from "config";
import { winstonLogger } from "./configs/logger.config";

async function bootstrap() {
  const logger = new Logger();
  const configService = config.get("server");

  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = configService.port;
  await app.listen(port);
  logger.log(`App Listening at localhost:${port}`);
}
bootstrap();
