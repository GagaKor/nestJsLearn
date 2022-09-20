import { Body, Get, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "src/auth/security/auth.guard";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-Category.dto";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }
  @Get()
  async getAll() {
    return await this.categoryService.getAll();
  }
}
