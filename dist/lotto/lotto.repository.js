"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LottoRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const Lotto_entity_1 = require("./entities/Lotto.entity");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
let LottoRepository = class LottoRepository extends typeorm_1.Repository {
    async saveLotto(lottoDto) {
        const lotto = this.create({
            id: (0, uuid_1.v4)(),
            round: lottoDto.round,
            lotto_number: JSON.stringify(lottoDto.lotto),
        });
        await this.save(lotto);
        return lotto;
    }
};
LottoRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(Lotto_entity_1.Lotto)
], LottoRepository);
exports.LottoRepository = LottoRepository;
//# sourceMappingURL=lotto.repository.js.map