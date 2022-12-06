import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from 'src/category/dto/create-Category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-Category.dto';
import { Category } from './entities/Category.entity';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { categoryName } = createCategoryDto;
    const category = Category.create({
      id: uuid(),
      categoryName,
    });
    return await this.categoryRepository.save(category);
  }

  async getAll() {
    return await this.categoryRepository.find({
      select: ['id', 'categoryName'],
    });
  }

  async getOneCategory(id: string) {
    return await this.categoryRepository.find({
      select: {
        id: true,
        categoryName: true,
        board: {
          id: true,
          title: true,
          status: true,
          comment: false,
          createdAt: true,
        },
      },
      relations: { board: true },
      where: { id },
    });
  }

  async findById(id: string) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async updateCategory(id: string, updatecategoryDto: UpdateCategoryDto) {
    const { categoryName } = updatecategoryDto;
    return await this.categoryRepository.update(id, { categoryName });
  }
  async deleteCategory(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
