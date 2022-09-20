import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/category/entities/Category.entity";
import { TypeOrmExModule } from "src/configs/typeorm-ex.module";
import { CategoryRepository } from "./category.repository";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Category]), TypeOrmExModule.forCustomRepository([CategoryRepository])],
  exports: [CategoryService],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
