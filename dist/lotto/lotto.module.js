"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LottoModule = void 0;
const common_1 = require("@nestjs/common");
const lotto_controller_1 = require("./lotto.controller");
const lotto_service_1 = require("./lotto.service");
const auth_module_1 = require("../auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const LottoUser_entity_1 = require("./entities/LottoUser.entity");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const lottoUser_repository_1 = require("./lottoUser.repository");
const lotto_repository_1 = require("./lotto.repository");
const Lotto_entity_1 = require("./entities/Lotto.entity");
let LottoModule = class LottoModule {
};
LottoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            typeorm_1.TypeOrmModule.forFeature([LottoUser_entity_1.LottoUser, Lotto_entity_1.Lotto]),
            typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([lottoUser_repository_1.LottoUserRepository, lotto_repository_1.LottoRepository]),
        ],
        exports: [lotto_service_1.LottoService],
        controllers: [lotto_controller_1.LottoController],
        providers: [lotto_service_1.LottoService],
    })
], LottoModule);
exports.LottoModule = LottoModule;
//# sourceMappingURL=lotto.module.js.map