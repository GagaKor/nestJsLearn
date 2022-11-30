"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsRepository = void 0;
const typeorm_ex_decorator_1 = require("../database/typeorm-ex.decorator");
const Comment_entity_1 = require("./entities/Comment.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const uuid_1 = require("uuid");
let CommentsRepository = class CommentsRepository extends typeorm_1.Repository {
    async createComment(comment, board, user) {
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const data = this.create({
            id: (0, uuid_1.v4)(),
            comment,
            board,
            username: user.username,
            user,
        });
        await this.save(data);
    }
    async updateComment(id, updateCommnetDto, user) {
        const beforeComment = await this.findOneBy({ id });
        if (!beforeComment)
            throw new common_2.NotFoundException('Can not found comment');
        if (beforeComment.username !== user.username)
            throw new common_1.UnauthorizedException();
        const { comment } = updateCommnetDto;
        await this.update(id, { comment });
    }
    async deleteComment(id, user) {
        const { username } = await this.findOne({
            select: ['username'],
            where: { id },
        });
        if (username !== user.username)
            throw new common_1.UnauthorizedException();
        const comment = '작성자에 의해 삭제된 댓글입니다.';
        await this.update(id, { comment });
    }
};
CommentsRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(Comment_entity_1.Comment)
], CommentsRepository);
exports.CommentsRepository = CommentsRepository;
//# sourceMappingURL=comments.repository.js.map