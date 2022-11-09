import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Category } from "src/category/entities/Category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-Category.dto";
import { UpdateCategoryDto } from "./dto/update-Category.dto";

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
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const { categoryName } = updateCategoryDto;
    await this.update(id, { categoryName });
  }
}
