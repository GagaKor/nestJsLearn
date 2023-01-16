"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_Category_dto_1 = require("./create-Category.dto");
class UpdateCategoryDto extends (0, mapped_types_1.PartialType)(create_Category_dto_1.CreateCategoryDto) {
}
exports.UpdateCategoryDto = UpdateCategoryDto;
//# sourceMappingURL=update-Category.dto.js.map