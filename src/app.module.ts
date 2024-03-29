import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MoviesModule } from 'src/movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from 'src/app.controller';
import { BoardsModule } from 'src/boards/boards.module';
import { AuthModule } from 'src/auth/auth.module';
import { typeOrmAsyncConfig } from 'src/database/typeorm.config';
import { LoggerMiddleware } from 'src/middleware/logger-middleware';
import { CommentsModule } from 'src/comments/comments.module';
import { CategoryModule } from 'src/category/category.module';
import { RolesGuard } from 'src/auth/security/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { LottoModule } from 'src/lotto/lotto.module';
import { ConfigModule } from '@nestjs/config';
import { BatchModuleModule } from 'src/batch-module/batch-module.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TwelModule } from './twel/twel.module';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'prod'
          ? '.env'
          : `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    MoviesModule,
    BoardsModule,
    AuthModule,
    CommentsModule,
    CategoryModule,
    LottoModule,
    BatchModuleModule,
    TwelModule,
  ],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
