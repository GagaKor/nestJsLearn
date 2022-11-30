import { Module } from '@nestjs/common';
import { CategoryController } from 'src/category/category.controller';
import { CategoryService } from 'src/category/category.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/Category.entity';
import { TypeOrmExModule } from 'src/database/typeorm-ex.module';
import { CategoryRepository } from 'src/category/category.repository';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Category]),
    TypeOrmExModule.forCustomRepository([CategoryRepository]),
  ],
  exports: [CategoryService],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
