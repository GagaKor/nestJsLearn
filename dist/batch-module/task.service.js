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
var TaskService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const lotto_excel_1 = require("../utils/lotto.excel");
const lotto_1 = require("../utils/lotto");
const lotto_service_1 = require("../lotto/lotto.service");
const lotto_excel_2 = require("./../utils/lotto.excel");
let TaskService = TaskService_1 = class TaskService {
    constructor(lottoService) {
        this.lottoService = lottoService;
        this.logger = new common_2.Logger(TaskService_1.name);
    }
    async downloadCron() {
        this.logger.log('TASK CALLED DownloadCron');
        await (0, lotto_excel_2.downloadExcel)();
        this.logger.log('Success Download File');
        this.logger.log('Finish Cron Job');
    }
    async saveLottoCron() {
        this.logger.log('TASK CALLED SaveLottoCron');
        if ((0, lotto_excel_1.fileCheck)()) {
            this.logger.log('FILE CHECKED');
            const lastLotto = await this.lottoService.getLastLotto();
            let round = 0;
            if (lastLotto.length > 0) {
                round = lastLotto[0].round + 2;
            }
            const games = await (0, lotto_1.getThisWeekLotto)(round);
            if (games) {
                await this.lottoService.saveLotto(games);
            }
            (0, lotto_excel_1.remove)();
            this.logger.log('Saved Lotto');
        }
        this.logger.log('Finish Cron Job');
    }
};
__decorate([
    (0, schedule_1.Cron)('10 0 * * 7', { name: 'Excel Download' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "downloadCron", null);
__decorate([
    (0, schedule_1.Cron)('13 0 * * 7', { name: 'Save Lotto' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "saveLottoCron", null);
TaskService = TaskService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lotto_service_1.LottoService])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map