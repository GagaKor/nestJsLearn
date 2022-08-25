import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { BoardsModule } from "./boards/boards.module";
import { AuthModule } from './auth/auth.module';
import { typeORMConfig } from "./configs/typeorm.config";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    MoviesModule,
    BoardsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
