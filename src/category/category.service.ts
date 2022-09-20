import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./category.repository";
import { CreateCategoryDto } from "./dto/create-Category.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.createCategory(createCategoryDto);
  }

  async getAll() {
    return await this.categoryRepository.find({ select: ["id", "categoryName"] });
  }
  async findById(id: number) {
    return await this.categoryRepository.findOneBy({ id });
  }
}
