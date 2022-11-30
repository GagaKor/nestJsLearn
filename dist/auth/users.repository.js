"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const User_entity_1 = require("./entities/User.entity");
const bcrypt = require("bcryptjs");
const uuid_1 = require("uuid");
let UsersRepository = class UsersRepository extends typeorm_1.Repository {
    async createUser(authCredentialsDto) {
        const { username, password, role } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.create({
            id: (0, uuid_1.v4)(),
            username,
            password: hashedPassword,
            role,
        });
        try {
            await this.save(user);
        }
        catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new common_1.ConflictException('Existing username');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async signIn(authLoginDto) {
        const { username, password } = authLoginDto;
        const user = await this.findOne({ where: { username } });
        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        }
        else {
            throw new common_1.UnauthorizedException('login Failed');
        }
    }
};
UsersRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(User_entity_1.User)
], UsersRepository);
exports.UsersRepository = UsersRepository;
//# sourceMappingURL=users.repository.js.map