"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthLoginDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const auth_credential_dto_1 = require("./auth-credential.dto");
class AuthLoginDto extends (0, mapped_types_1.PartialType)(auth_credential_dto_1.AuthCredentialsDto) {
}
exports.AuthLoginDto = AuthLoginDto;
//# sourceMappingURL=auth-login.dto.js.map