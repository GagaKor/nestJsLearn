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
exports.LottoController = void 0;
const common_1 = require("@nestjs/common");
const lotto_service_1 = require("./lotto.service");
const create_lotto_dto_1 = require("./dto/create-lotto.dto");
const auth_guard_1 = require("../auth/security/auth.guard");
const save_myLotto_dto_1 = require("./dto/save-myLotto.dto");
const get_user_decorator_1 = require("../decorator/get-user.decorator");
const User_entity_1 = require("../auth/entities/User.entity");
const lottoUser_service_1 = require("./lottoUser.service");
let LottoController = class LottoController {
    constructor(lottoService, lottoUserService) {
        this.lottoService = lottoService;
        this.lottoUserService = lottoUserService;
    }
    lottoFindByUser(user) {
        return this.lottoUserService.lottoFindByUser(user);
    }
    getThisWeekLotto() {
        return this.lottoService.getLastLotto();
    }
    createLotto(createLottoDto) {
        return this.lottoService.createLotto(createLottoDto);
    }
    saveMyLotto(saveMyLotto, user) {
        return this.lottoUserService.saveMyLotto(saveMyLotto, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_entity_1.User]),
    __metadata("design:returntype", Promise)
], LottoController.prototype, "lottoFindByUser", null);
__decorate([
    (0, common_1.Get)('thisweek'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LottoController.prototype, "getThisWeekLotto", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lotto_dto_1.CreateLottoDto]),
    __metadata("design:returntype", Promise)
], LottoController.prototype, "createLotto", null);
__decorate([
    (0, common_1.Post)('save'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [save_myLotto_dto_1.SaveMyLottoDto, User_entity_1.User]),
    __metadata("design:returntype", void 0)
], LottoController.prototype, "saveMyLotto", null);
LottoController = __decorate([
    (0, common_1.Controller)('lotto'),
    __metadata("design:paramtypes", [lotto_service_1.LottoService,
        lottoUser_service_1.LottoUserService])
], LottoController);
exports.LottoController = LottoController;
//# sourceMappingURL=lotto.controller.js.map