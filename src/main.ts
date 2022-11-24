import { ValidationPipe, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/app.module";
import { winstonLogger } from "src/configs/logger.config";
import * as cookieParser from "cookie-parser";
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(`------------${process.env.NODE_ENV} App Listening at localhost:${port}------------`);
}
bootstrap();
