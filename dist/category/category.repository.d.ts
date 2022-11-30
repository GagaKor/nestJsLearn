import { Category } from 'src/category/entities/Category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/category/dto/create-Category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-Category.dto';
export declare class CategoryRepository extends Repository<Category> {
    createCategory(createCategoryDto: CreateCategoryDto): Promise<Category>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<void>;
}
