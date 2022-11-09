import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { User } from "src/auth/entities/User.entity";
import { Board } from "src/boards/entities/Board.entity";
import { Category } from "src/category/entities/Category.entity";
import { Comment } from "src/comments/entities/Comment.entity";

// export const typeORMConfig: TypeOrmModuleOptions = {
//   type: "mysql",
//   host: process.env.DB_HOST,
//   port: parseInt(process.env.DB_PORT),
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   entities: [__dirname + "/../**/*.entity.{js,ts}"],
//   synchronize: Boolean(process.env.DB_SYNCHRONIZE),
//   migrationsRun: false,
//   logging: false,
//   charset: "utf8mb4",
// };

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [],
  inject: [],
  useFactory: async () => {
    return {
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // entities: [__dirname + "/../**/*.entity.{js,ts}"],
      entities: [User, Board, Category, Comment],
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      migrationsRun: false,
      logging: false,
      charset: "utf8mb4",
    };
  },
};
