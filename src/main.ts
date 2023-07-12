import { ValidationPipe, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { winstonLogger } from 'src/configs/logger.config';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  app.enableCors({
    origin: ['http://localhost:3000', 'https://gagakor.xyz'],
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.log(
    `------------${process.env.NODE_ENV} App Listening at localhost:${port}------------`,
  );
}
bootstrap();
