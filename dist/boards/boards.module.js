"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("../auth/auth.module");
const typeorm_ex_module_1 = require("../database/typeorm-ex.module");
const boards_controller_1 = require("./boards.controller");
const boards_repository_1 = require("./boards.repository");
const boards_service_1 = require("./boards.service");
const Board_entity_1 = require("./entities/Board.entity");
const category_module_1 = require("../category/category.module");
let BoardsModule = class BoardsModule {
};
BoardsModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, category_module_1.CategoryModule, typeorm_1.TypeOrmModule.forFeature([Board_entity_1.Board]), typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([boards_repository_1.BoardsRepository])],
        exports: [boards_service_1.BoardsService],
        controllers: [boards_controller_1.BoardsController],
        providers: [boards_service_1.BoardsService],
    })
], BoardsModule);
exports.BoardsModule = BoardsModule;
//# sourceMappingURL=boards.module.js.map