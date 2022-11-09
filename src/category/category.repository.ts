import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Category } from "src/category/entities/Category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "src/category/dto/create-Category.dto";
import { UpdateCategoryDto } from "src/category/dto/update-Category.dto";

@CustomRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { categoryName } = createCategoryDto;
    const category = this.create({
      categoryName,
    });
    const result = await this.save(category);
    return result;
  }
  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const { categoryName } = updateCategoryDto;
    await this.update(id, { categoryName });
  }
}
