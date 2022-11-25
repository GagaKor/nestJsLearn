"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../role.enum");
class RoleValidationPipe {
    constructor() {
        this.StatusOptions = [
            role_enum_1.Role.Admin,
            role_enum_1.Role.User
        ];
    }
    transform(value) {
        value = value.toLowerCase();
        if (!this.isStatus(value))
            throw new common_1.BadRequestException(`${value} isn't in the status options`);
        return value;
    }
    isStatus(status) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}
exports.RoleValidationPipe = RoleValidationPipe;
//# sourceMappingURL=boardsStatusValidation.pipe.js.map