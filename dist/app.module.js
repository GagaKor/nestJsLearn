"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const movies_module_1 = require("./movies/movies.module");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const boards_module_1 = require("./boards/boards.module");
const auth_module_1 = require("./auth/auth.module");
const typeorm_config_1 = require("./database/typeorm.config");
const logger_middleware_1 = require("./middleware/logger-middleware");
const comments_module_1 = require("./comments/comments.module");
const category_module_1 = require("./category/category.module");
const roles_guard_1 = require("./auth/security/roles.guard");
const core_1 = require("@nestjs/core");
const lotto_module_1 = require("./lotto/lotto.module");
const config_1 = require("@nestjs/config");
const batch_module_module_1 = require("./batch-module/batch-module.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV === 'prod'
                    ? '.env'
                    : `.env.${process.env.NODE_ENV}`,
                isGlobal: true,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'static'),
            }),
            typeorm_1.TypeOrmModule.forRootAsync(typeorm_config_1.typeOrmAsyncConfig),
            movies_module_1.MoviesModule,
            boards_module_1.BoardsModule,
            auth_module_1.AuthModule,
            comments_module_1.CommentsModule,
            category_module_1.CategoryModule,
            lotto_module_1.LottoModule,
            batch_module_module_1.BatchModuleModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            common_1.Logger,
            {
                provide: core_1.APP_GUARD,
                useClass: roles_guard_1.RolesGuard,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map