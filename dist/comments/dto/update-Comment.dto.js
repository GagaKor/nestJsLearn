"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCommnetDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_Comment_dto_1 = require("./create-Comment.dto");
class UpdateCommnetDto extends (0, mapped_types_1.PartialType)(create_Comment_dto_1.CreateCommnetDto) {
}
exports.UpdateCommnetDto = UpdateCommnetDto;
//# sourceMappingURL=update-Comment.dto.js.map