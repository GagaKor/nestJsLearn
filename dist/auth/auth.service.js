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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const dist_1 = require("@nestjs/jwt/dist");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(usersReository, jwtService) {
        this.usersReository = usersReository;
        this.jwtService = jwtService;
    }
    async findAll() {
        return await this.usersReository.find();
    }
    async findByUsername(username) {
        return this.usersReository.findOne({ where: { username } });
    }
    async sighUp(authCredentialsDto) {
        await this.usersReository.createUser(authCredentialsDto);
    }
    async signIn(authLoginDto) {
        const user = await this.usersReository.signIn(authLoginDto);
        const { accessToken, accessOption } = await this.getJwtAcessToken(user);
        const { refreshToken, refreshOption } = await this.getJwtRefreshToken(user.username);
        await this.updateJwtRefershToken(refreshToken, authLoginDto.username);
        return { username: user.username, accessToken, accessOption, refreshToken, refreshOption };
    }
    async getJwtRefreshToken(username) {
        const payload = { username };
        let refreshToken = await this.jwtService.sign(payload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: process.env.REFRESH_EXPPIRESIN });
        return {
            refreshToken,
            refreshOption: {
                domain: "localhost",
                path: "/",
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
        };
    }
    async getJwtAcessToken(user) {
        const payload = { username: user.username };
        const accessToken = await this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.AUTH_EXPPIRESIN });
        return {
            accessToken,
            accessOption: {
                domain: "localhost",
                path: "/",
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            },
        };
    }
    async getUserRefreshTokenMatches(refreshToken, username) {
        const user = await this.usersReository.findOneBy({ username });
        if (!user) {
            throw new common_1.UnauthorizedException("Can not find user");
        }
        const isRefreshTokenMatch = await bcrypt.compare(refreshToken, user.refreshToken);
        if (isRefreshTokenMatch) {
            return { result: true };
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async updateJwtRefershToken(refreshToken, username) {
        if (refreshToken) {
            refreshToken = await bcrypt.hash(refreshToken, 10);
        }
        await this.usersReository.update({ username }, { refreshToken });
    }
    logOut() {
        return {
            accessOption: {
                domain: "localhost",
                path: "/",
                httpOnly: true,
                maxAge: 0,
            },
            refreshOption: {
                domain: "localhost",
                path: "/",
                httpOnly: true,
                maxAge: 0,
            },
        };
    }
    async removeRefreshToken(username) {
        const user = await this.usersReository.findOneBy({ username });
        user.refreshToken = null;
        await this.usersReository.save(user);
    }
    async deleteUser(authCredentialsDto) {
        const user = await this.findByUsername(authCredentialsDto.username);
        if (!user)
            throw new common_1.UnauthorizedException("Can not find user");
        const matchPassword = await bcrypt.compare(authCredentialsDto.password, user.password);
        if (!matchPassword)
            throw new common_1.UnauthorizedException(`${user.username} Password Incorrect`);
        await this.usersReository.delete(user.id);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UsersRepository, dist_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map