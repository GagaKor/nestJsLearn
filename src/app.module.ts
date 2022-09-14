import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MoviesModule } from "src/movies/movies.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "src/app.controller";
import { BoardsModule } from "src/boards/boards.module";
import { AuthModule } from "src/auth/auth.module";
import { typeORMConfig } from "src/configs/typeorm.config";
import { LoggerMiddleware } from "src/middleware/logger-middleware";
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), MoviesModule, BoardsModule, AuthModule, CommentsModule],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
