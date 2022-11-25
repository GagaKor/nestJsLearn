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
exports.LottoUser = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../../auth/entities/User.entity");
let LottoUser = class LottoUser extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    __metadata("design:type", String)
], LottoUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], LottoUser.prototype, "myLotto", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, user => user.lottos, { onDelete: "CASCADE", eager: false }),
    (0, typeorm_1.JoinTable)({ name: "lottoId" }),
    __metadata("design:type", User_entity_1.User)
], LottoUser.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], LottoUser.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
    }),
    __metadata("design:type", Date)
], LottoUser.prototype, "updatedAt", void 0);
LottoUser = __decorate([
    (0, typeorm_1.Entity)()
], LottoUser);
exports.LottoUser = LottoUser;
//# sourceMappingURL=LottoUser.entity.js.map