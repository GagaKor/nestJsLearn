"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const typeorm_1 = require("typeorm");
const Board_entity_1 = require("./entities/Board.entity");
const uuid_1 = require("uuid");
let BoardsRepository = class BoardsRepository extends typeorm_1.Repository {
    async createBoard(createBaordDto, user, category) {
        const { title, content, status } = createBaordDto;
        const board = this.create({
            id: (0, uuid_1.v4)(),
            title,
            content,
            status,
            user,
            category,
        });
        await this.save(board);
        return board;
    }
};
BoardsRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(Board_entity_1.Board)
], BoardsRepository);
exports.BoardsRepository = BoardsRepository;
//# sourceMappingURL=boards.repository.js.map