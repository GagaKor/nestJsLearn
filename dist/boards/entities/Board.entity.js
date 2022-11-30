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
exports.Board = void 0;
const User_entity_1 = require("../../auth/entities/User.entity");
const typeorm_1 = require("typeorm");
const board_status_enum_1 = require("../board-status-enum");
const Comment_entity_1 = require("../../comments/entities/Comment.entity");
const Category_entity_1 = require("../../category/entities/Category.entity");
let Board = class Board extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: 'uuid' }),
    __metadata("design:type", String)
], Board.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Board.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_entity_1.Category, (category) => category.board, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    __metadata("design:type", Category_entity_1.Category)
], Board.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_entity_1.User, (user) => user.boards, {
        onDelete: 'CASCADE',
        eager: false,
    }),
    (0, typeorm_1.JoinTable)({ name: 'boardId' }),
    __metadata("design:type", User_entity_1.User)
], Board.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_entity_1.Comment, (comment) => comment.board, {
        cascade: true,
        eager: false,
    }),
    __metadata("design:type", Array)
], Board.prototype, "comment", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Board.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
    }),
    __metadata("design:type", Date)
], Board.prototype, "updatedAt", void 0);
Board = __decorate([
    (0, typeorm_1.Entity)()
], Board);
exports.Board = Board;
//# sourceMappingURL=Board.entity.js.map