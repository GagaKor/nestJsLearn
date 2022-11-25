"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LottoUserRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const LottoUser_entity_1 = require("./entities/LottoUser.entity");
const typeorm_1 = require("typeorm");
let LottoUserRepository = class LottoUserRepository extends typeorm_1.Repository {
    async saveMyLotto(saveMyLottoDto, user) {
        const lotto = this.create({
            myLotto: JSON.stringify(saveMyLottoDto.myLotto),
            user,
        });
        await this.save(lotto);
        return lotto;
    }
};
LottoUserRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(LottoUser_entity_1.LottoUser)
], LottoUserRepository);
exports.LottoUserRepository = LottoUserRepository;
//# sourceMappingURL=lottoUser.repository.js.map