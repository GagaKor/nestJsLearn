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
exports.LottoUserService = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("@nestjs/common/services");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const LottoUser_entity_1 = require("./entities/LottoUser.entity");
const uuid_1 = require("uuid");
let LottoUserService = class LottoUserService {
    constructor(lottoUserRepository) {
        this.lottoUserRepository = lottoUserRepository;
        this.logger = new services_1.Logger('Lotto Service');
    }
    async lottoFindByUser(user) {
        const lotto = this.lottoUserRepository.find({
            where: { user: { id: user.id } },
            relations: { user: true },
            select: { id: true, myLotto: true, user: { username: true } },
        });
        return lotto;
    }
    async saveMyLotto(saveMyLottoDto, user) {
        const lotto = LottoUser_entity_1.LottoUser.create({
            id: (0, uuid_1.v4)(),
            myLotto: JSON.stringify(saveMyLottoDto.myLotto),
            user,
        });
        await this.lottoUserRepository.save(lotto);
    }
};
LottoUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(LottoUser_entity_1.LottoUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LottoUserService);
exports.LottoUserService = LottoUserService;
//# sourceMappingURL=lottoUser.service.js.map