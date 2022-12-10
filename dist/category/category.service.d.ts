import { CreateCategoryDto } from 'src/category/dto/create-Category.dto';
import { UpdateCategoryDto } from 'src/category/dto/update-Category.dto';
import { Category } from './entities/Category.entity';
import { Repository } from 'typeorm';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<Category>;
    getAll(): Promise<Category[]>;
    getOneCategory(id: string): Promise<Category[]>;
    findById(id: string): Promise<Category>;
    updateCategory(id: string, updatecategoryDto: UpdateCategoryDto): Promise<import("typeorm").UpdateResult>;
    deleteCategory(id: string): Promise<import("typeorm").DeleteResult>;
}
