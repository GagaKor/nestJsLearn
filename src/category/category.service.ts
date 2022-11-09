import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "src/category/category.repository";
import { CreateCategoryDto } from "src/category/dto/create-Category.dto";
import { UpdateCategoryDto } from "src/category/dto/update-Category.dto";

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.createCategory(createCategoryDto);
  }

  async getAll() {
    return await this.categoryRepository.find({ select: ["id", "categoryName"] });
  }

  async getOneCategory(id: string) {
    return await this.categoryRepository.find({
      select: { id: true, categoryName: true, board: { id: true, title: true, status: true, comment: false, createdAt: true } },
      relations: { board: true },
      where: { id },
    });
  }

  async findById(id: string) {
    return await this.categoryRepository.findOneBy({ id });
  }

  async updateCategory(id: string, updatecategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.updateCategory(id, updatecategoryDto);
  }
  async deleteCategory(id: string) {
    return await this.categoryRepository.delete(id);
  }
}
