import { Logger, MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { BoardsModule } from "./boards/boards.module";
import { AuthModule } from "./auth/auth.module";
import { typeORMConfig } from "./configs/typeorm.config";
import { LoggerMiddleware } from "./middleware/logger-middleware";

@Module({
  imports: [TypeOrmModule.forRoot(typeORMConfig), MoviesModule, BoardsModule, AuthModule],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}
