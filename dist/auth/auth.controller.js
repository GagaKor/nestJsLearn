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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_credential_dto_1 = require("./dto/auth-credential.dto");
const User_entity_1 = require("./entities/User.entity");
const decorators_1 = require("@nestjs/common/decorators");
const jwtRefreshToken_guard_1 = require("./security/jwtRefreshToken.guard");
const get_user_decorator_1 = require("../decorator/get-user.decorator");
const passport_1 = require("@nestjs/passport");
const auth_login_dto_1 = require("./dto/auth-login.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
        this.logger = new common_1.Logger("Auth");
    }
    findAll() {
        return this.authService.findAll();
    }
    async signIn(authLoginDto, res) {
        const { username, accessToken, accessOption, refreshToken, refreshOption } = await this.authService.signIn(authLoginDto);
        res.cookie("Authentication", accessToken, accessOption);
        res.cookie("Refresh", refreshToken, refreshOption);
        this.logger.verbose(`${username} is login`);
        return { username };
    }
    signUp(authCredentialsDto) {
        return this.authService.sighUp(authCredentialsDto);
    }
    async refresh(res, user) {
        if (user) {
            this.logger.verbose(`${user.username} refresh Token`);
            const { accessToken, accessOption } = await this.authService.getJwtAcessToken(user);
            res.cookie("Authentication", accessToken, accessOption);
            return user;
        }
    }
    async logOut(res, user) {
        const { accessOption, refreshOption } = this.authService.logOut();
        await this.authService.removeRefreshToken(user.username);
        this.logger.verbose(`${user.username} log out`);
        res.cookie("Authentication", "", accessOption);
        res.cookie("Refresh", refreshOption);
    }
    deleteUser(authCredentialsDto) {
        return this.authService.deleteUser(authCredentialsDto);
    }
    getTest(username) {
        return this.authService.getJwtRefreshToken(username);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __param(1, (0, decorators_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_login_dto_1.AuthLoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)("signup"),
    __param(0, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credential_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)("refresh"),
    (0, common_1.UseGuards)(jwtRefreshToken_guard_1.JwtRefreshGuard),
    __param(0, (0, decorators_1.Res)({ passthrough: true })),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, User_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)("logout"),
    (0, common_1.UseGuards)(jwtRefreshToken_guard_1.JwtRefreshGuard),
    __param(0, (0, decorators_1.Res)({ passthrough: true })),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, User_entity_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_credential_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Get)("test"),
    __param(0, (0, common_1.Param)("username")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getTest", null);
AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map