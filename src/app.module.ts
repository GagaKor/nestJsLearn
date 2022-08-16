import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MoviesModule } from "./movies/movies.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as Joi from "joi";

import { AppController } from "./app.controller";
import { Movie } from "./movies/entities/Movie.entity";
import { BoardsModule } from './boards/boards.module';
import { Board } from "./boards/entiies/Board.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("dev", "prod").required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Movie, Board],
      synchronize: true,
      logging: true,
    }),
    MoviesModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
