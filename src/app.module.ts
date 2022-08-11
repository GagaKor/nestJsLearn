import { Module } from "@nestjs/common";
import { MoviesModule } from "./movies/movies.module";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Movie } from "./movies/entities/Movie.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'testData',
      entities: [Movie],
      synchronize: true,
    })
    ,MoviesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
