"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const Category_entity_1 = require("./entities/Category.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let CategoryRepository = class CategoryRepository extends typeorm_1.Repository {
    async createCategory(createCategoryDto) {
        const { categoryName } = createCategoryDto;
        const category = this.create({
            id: (0, uuid_1.v4)(),
            categoryName,
        });
        const result = await this.save(category);
        return result;
    }
    async updateCategory(id, updateCategoryDto) {
        const { categoryName } = updateCategoryDto;
        await this.update(id, { categoryName });
    }
};
CategoryRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(Category_entity_1.Category)
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category.repository.js.map