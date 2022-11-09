import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MoviesModule } from "src/movies/movies.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "src/app.controller";
import { BoardsModule } from "src/boards/boards.module";
import { AuthModule } from "src/auth/auth.module";
import { typeOrmAsyncConfig, typeORMConfig } from "src/configs/typeorm.config";
import { LoggerMiddleware } from "src/middleware/logger-middleware";
import { CommentsModule } from "./comments/comments.module";
import { CategoryModule } from "./category/category.module";
import { RolesGuard } from "./auth/security/roles.guard";
import { APP_GUARD } from "@nestjs/core";
import { LottoModule } from './lotto/lotto.module';
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV !== 'production' ? `.env.${process.env.NODE_ENV}` : '.env',
      isGlobal : true
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig), MoviesModule, BoardsModule, AuthModule, CommentsModule, CategoryModule, LottoModule],
  controllers: [AppController],
  providers: [
    Logger,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
