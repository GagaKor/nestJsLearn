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
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const board_status_enum_1 = require("./board-status-enum");
const boards_service_1 = require("./boards.service");
const create_board_dto_1 = require("./dto/create-board.dto");
const update_board_dto_1 = require("./dto/update-board.dto");
const boardsStatusValidation_pipe_1 = require("./Pipes/boardsStatusValidation.pipe");
const get_user_decorator_1 = require("../decorator/get-user.decorator");
const User_entity_1 = require("../auth/entities/User.entity");
const auth_guard_1 = require("../auth/security/auth.guard");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
        this.logger = new common_1.Logger('Boards');
    }
    async findAll(categoryId, page, take) {
        const getBoard = { categoryId, page, take };
        return await this.boardsService.findAll(getBoard);
    }
    getAllUserBoard(user) {
        this.logger.verbose(`User ${user.username} trying to get all boards`);
        return this.boardsService.getAllUserBoard(user);
    }
    findByTitleOrContent(data, categoryId) {
        return this.boardsService.findByTitleOrContent(data, categoryId);
    }
    findById(id) {
        return this.boardsService.findById(id);
    }
    create(createBoardDto, user) {
        this.logger.verbose(`User ${user.username} creating a new board. 
    Payload : ${JSON.stringify(createBoardDto)}`);
        const checkStatus = createBoardDto.status.toUpperCase();
        if (checkStatus !== 'PUBLIC' && checkStatus !== 'PRIVATE') {
            throw new common_1.BadRequestException('Invalid status value.');
        }
        return this.boardsService.create(createBoardDto, user);
    }
    update(id, updateBoardDto, user) {
        this.logger.verbose(`User ${user.username} updating a id:${id} board. 
    Payload : ${JSON.stringify(updateBoardDto)}`);
        const checkStatus = updateBoardDto.status.toUpperCase();
        if (checkStatus !== 'PUBLIC' && checkStatus !== 'PRIVATE') {
            throw new common_1.BadRequestException('Invalid status value.');
        }
        return this.boardsService.update(id, updateBoardDto, user);
    }
    updateStatus(id, status, user) {
        return this.boardsService.updateStatus(id, status, user);
    }
    delete(id, user) {
        return this.boardsService.delete(id, user);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('categoryId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('myBoard'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getAllUserBoard", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('data')),
    __param(1, (0, common_1.Query)('categoryId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findByTitleOrContent", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_board_dto_1.CreateBaordDto,
        User_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_board_dto_1.UpdateBoardDto,
        User_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('status/:id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status', boardsStatusValidation_pipe_1.BoardStatusValidationPipe)),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, User_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, User_entity_1.User]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "delete", null);
BoardsController = __decorate([
    (0, common_1.Controller)('boards'),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
exports.BoardsController = BoardsController;
//# sourceMappingURL=boards.controller.js.map