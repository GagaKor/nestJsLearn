import { CategoryService } from 'src/category/category.service';
import { CreateCategoryDto } from 'src/category/dto/create-Category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-Category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./entities/Category.entity").Category>;
    getAll(): Promise<import("./entities/Category.entity").Category[]>;
    getOneCategory(id: string): Promise<import("./entities/Category.entity").Category[]>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<void>;
    deleteCategory(id: string): Promise<import("typeorm").DeleteResult>;
}
