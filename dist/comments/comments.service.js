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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const boards_service_1 = require("../boards/boards.service");
const uuid_1 = require("uuid");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const Comment_entity_1 = require("./entities/Comment.entity");
let CommentsService = class CommentsService {
    constructor(commentsRepository, boardsService) {
        this.commentsRepository = commentsRepository;
        this.boardsService = boardsService;
    }
    async create(createCommnetDto, user) {
        const board = await this.boardsService.findById(createCommnetDto.boardId);
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const comment = Comment_entity_1.Comment.create({
            id: (0, uuid_1.v4)(),
            comment: createCommnetDto.comment,
            board,
            username: user.username,
            user,
        });
        await this.commentsRepository.save(comment);
    }
    async updateComment(id, updateCommnetDto, user) {
        const beforeComment = await this.commentsRepository.findOneBy({ id });
        if (!beforeComment)
            throw new common_1.NotFoundException('Can not found comment');
        if (beforeComment.username !== user.username)
            throw new common_1.UnauthorizedException();
        const { comment } = updateCommnetDto;
        await this.commentsRepository.update(id, { comment });
    }
    async deleteComment(id, user) {
        const { username } = await this.commentsRepository.findOne({
            select: ['username'],
            where: { id },
        });
        if (username !== user.username)
            throw new common_1.UnauthorizedException();
        const comment = '작성자에 의해 삭제된 댓글입니다.';
        await this.commentsRepository.update(id, { comment });
    }
};
CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        boards_service_1.BoardsService])
], CommentsService);
exports.CommentsService = CommentsService;
//# sourceMappingURL=comments.service.js.map