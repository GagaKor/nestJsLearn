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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const comments_repository_1 = require("./comments.repository");
const boards_service_1 = require("../boards/boards.service");
let CommentsService = class CommentsService {
    constructor(commentsRepository, boardsService) {
        this.commentsRepository = commentsRepository;
        this.boardsService = boardsService;
    }
    async create(createCommnetDto, user) {
        const board = await this.boardsService.findById(createCommnetDto.boardId);
        await this.commentsRepository.createComment(createCommnetDto.comment, board, user);
    }
    async updateComment(id, updateCommnetDto, user) {
        await this.commentsRepository.updateComment(id, updateCommnetDto, user);
    }
    async deleteComment(id, user) {
        await this.commentsRepository.deleteComment(id, user);
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [comments_repository_1.CommentsRepository, boards_service_1.BoardsService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map