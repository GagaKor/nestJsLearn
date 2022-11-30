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
exports.RefreshJwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const typeorm_1 = require("@nestjs/typeorm");
const passport_jwt_1 = require("passport-jwt");
const users_repository_1 = require("./users.repository");
const auth_service_1 = require("./auth.service");
let RefreshJwtStrategy = class RefreshJwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'jwt-refresh-token') {
    constructor(usersRepository, authService) {
        super({
            secretOrKey: process.env.JWT_REFRESH_SECRET,
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromExtractors([
                (request) => {
                    var _a;
                    return (_a = request === null || request === void 0 ? void 0 : request.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
                },
            ]),
            passReqToCallback: true,
        });
        this.usersRepository = usersRepository;
        this.authService = authService;
    }
    async validate(req, { username }) {
        var _a;
        const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.Refresh;
        await this.authService.getUserRefreshTokenMatches(refreshToken, username);
        const user = await this.usersRepository.findOne({
            where: { username },
            select: ['id', 'username', 'refreshToken', 'role'],
        });
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        return user;
    }
};
RefreshJwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_repository_1.UsersRepository)),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository,
        auth_service_1.AuthService])
], RefreshJwtStrategy);
exports.RefreshJwtStrategy = RefreshJwtStrategy;
//# sourceMappingURL=refreshJwt.strategy.js.map