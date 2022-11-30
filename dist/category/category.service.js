"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const category_repository_1 = require("./category.repository");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto) {
        return await this.categoryRepository.createCategory(createCategoryDto);
    }
    async getAll() {
        return await this.categoryRepository.find({
            select: ['id', 'categoryName'],
        });
    }
    async getOneCategory(id) {
        return await this.categoryRepository.find({
            select: {
                id: true,
                categoryName: true,
                board: {
                    id: true,
                    title: true,
                    status: true,
                    comment: false,
                    createdAt: true,
                },
            },
            relations: { board: true },
            where: { id },
        });
    }
    async findById(id) {
        return await this.categoryRepository.findOneBy({ id });
    }
    async updateCategory(id, updatecategoryDto) {
        return await this.categoryRepository.updateCategory(id, updatecategoryDto);
    }
    async deleteCategory(id) {
        return await this.categoryRepository.delete(id);
    }
};
CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository])
], CategoryService);
exports.CategoryService = CategoryService;
//# sourceMappingURL=category.service.js.map