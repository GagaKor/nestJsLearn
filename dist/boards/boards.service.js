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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const board_status_enum_1 = require("./board-status-enum");
const Board_entity_1 = require("./entities/Board.entity");
const category_service_1 = require("../category/category.service");
const uuid_1 = require("uuid");
const typeorm_2 = require("@nestjs/typeorm");
let BoardsService = class BoardsService {
    constructor(boardRepository, categoryService) {
        this.boardRepository = boardRepository;
        this.categoryService = categoryService;
    }
    async findAll(getBoard) {
        const { categoryId, page, take } = getBoard;
        const status = board_status_enum_1.BoardStatus.PUBLIC;
        const count = await this.totalBoardCount(categoryId);
        const boards = await this.boardRepository.find({
            where: { status },
            relations: { user: true, category: true },
            select: {
                id: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                status: true,
                user: { username: true },
                category: { categoryName: true },
            },
            take: take,
            skip: (page - 1) * take,
            order: {
                createdAt: 'DESC',
            },
        });
        return {
            boards,
            count,
        };
    }
    async totalBoardCount(categoryId) {
        return await this.boardRepository.count({
            where: { category: { id: categoryId } },
        });
    }
    async findById(id) {
        const found = await this.boardRepository.findOne({
            where: { id },
            relations: { user: true, category: true, comment: true },
            select: { user: { username: true }, category: { categoryName: true } },
        });
        if (!found) {
            throw new common_1.NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }
    async getAllUserBoard(user) {
        const boards = await this.boardRepository.find({
            where: { user: { username: user.username } },
            relations: { user: true, category: true },
            select: { user: { username: true }, category: { categoryName: true } },
        });
        return boards;
    }
    async findByTitleOrContent(data, categoryId) {
        let result;
        if (categoryId) {
            result = await this.boardRepository.find({
                where: [
                    { title: (0, typeorm_1.Like)(`%${data}%`), category: { id: categoryId } },
                    { content: (0, typeorm_1.Like)(`%${data}%`), category: { id: categoryId } },
                ],
                relations: { user: true, category: true },
                select: { user: { username: true }, category: { categoryName: true } },
            });
        }
        else {
            result = await this.boardRepository.find({
                where: [{ title: (0, typeorm_1.Like)(`%${data}%`) }, { content: (0, typeorm_1.Like)(`%${data}%`) }],
                relations: { user: true, category: true },
                select: { user: { username: true }, category: { categoryName: true } },
            });
        }
        return result;
    }
    async create(createBaordDto, user) {
        const { categoryId } = createBaordDto;
        const category = await this.categoryService.findById(categoryId);
        const { title, content, status } = createBaordDto;
        const board = Board_entity_1.Board.create({
            id: (0, uuid_1.v4)(),
            title,
            content,
            status,
            user,
            category,
        });
        return await this.boardRepository.save(board);
    }
    async update(id, updateBoardDto, user) {
        const result = await this.boardRepository
            .createQueryBuilder('board')
            .update()
            .set(updateBoardDto)
            .where('id=:id AND userId = :userId', { id, userId: user.id })
            .execute();
        return result.affected > 0;
    }
    async updateStatus(id, status, user) {
        const board = await this.boardRepository
            .createQueryBuilder('board')
            .where('id = :id AND userId = :userId', { id, userId: user.id })
            .getOne();
        board.status = status;
        const result = await this.boardRepository.save(board);
        return result;
    }
    async delete(id, user) {
        const result = await this.boardRepository
            .createQueryBuilder('board')
            .delete()
            .where('id=:id AND userId = :userId', { id, userId: user.id })
            .execute();
        if (result.affected === 0)
            throw new common_1.NotFoundException(`Can't find ${id}`);
        return result;
    }
};
BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(Board_entity_1.Board)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        category_service_1.CategoryService])
], BoardsService);
exports.BoardsService = BoardsService;
//# sourceMappingURL=boards.service.js.map