import { Body, Patch, Delete, Param, Get, Controller, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "src/auth/security/auth.guard";
import { GetUser } from "src/decorator/get-user.decorator";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-Category.dto";
import { UpdateCategoryDto } from "./dto/update-Category.dto";
import { User } from "./../auth/entities/User.entity";
import { Roles } from "src/decorator/roles.decorator";
import { Role } from "src/auth/role.enum";
import { RolesGuard } from "./../auth/security/roles.guard";

@Controller("category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  async create(@Body(ValidationPipe) createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  async getAll() {
    return await this.categoryService.getAll();
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(":id")
  async updateCategory(@Param("id") id: number, @Body() updateCategoryDto: UpdateCategoryDto, @GetUser() user: User) {
    console.log("@@", user);
    // return await this.categoryService.updateCategory(id, updateCategoryDto);
  }
}
