import { CategoryRepository } from "src/category/category.repository";
import { CreateCategoryDto } from "src/category/dto/create-Category.dto";
import { UpdateCategoryDto } from "src/category/dto/update-Category.dto";
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    create(createCategoryDto: CreateCategoryDto): Promise<import("./entities/Category.entity").Category>;
    getAll(): Promise<import("./entities/Category.entity").Category[]>;
    getOneCategory(id: string): Promise<import("./entities/Category.entity").Category[]>;
    findById(id: string): Promise<import("./entities/Category.entity").Category>;
    updateCategory(id: string, updatecategoryDto: UpdateCategoryDto): Promise<void>;
    deleteCategory(id: string): Promise<import("typeorm").DeleteResult>;
}
