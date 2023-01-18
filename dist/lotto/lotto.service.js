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
exports.LottoService = void 0;
const common_1 = require("@nestjs/common");
const services_1 = require("@nestjs/common/services");
const typeorm_1 = require("@nestjs/typeorm");
const Lotto_entity_1 = require("./entities/Lotto.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
let LottoService = class LottoService {
    constructor(lottoRepository) {
        this.lottoRepository = lottoRepository;
        this.logger = new services_1.Logger('Lotto Service');
    }
    async createLotto(createLottoDto) {
        const { playGame, include, exclude, deviation, consecution, max, min } = createLottoDto;
        if (include && include.length > 6)
            throw new Error('Over 6 number');
        let data = await this.getLastLotto();
        const lastLotto = JSON.parse(data[0].lotto_number).map((str) => {
            return Number(str);
        });
        const beforeLottos = [];
        data = await this.getLottos();
        for (const d of data) {
            const parseIntArr = JSON.parse(d.lotto_number).map((str) => {
                return Number(str);
            });
            beforeLottos.push(parseIntArr);
        }
        const result = [];
        if (include.length === 6) {
            result.push(include);
            return result;
        }
        let countLoad = 0;
        for (let i = 0; i < playGame; i++) {
            countLoad++;
            if (countLoad > 5000000) {
                throw new common_1.RequestTimeoutException(`Can not resolve your order`);
            }
            let flag = true;
            let game = [];
            let anyNum = Math.floor(Math.random() * 6);
            if (include && include.length > 0) {
                game = [...include];
            }
            const gameLength = game.length;
            while (game.length < gameLength + 1) {
                if (exclude && !exclude.includes(lastLotto[anyNum])) {
                    if (game.includes(lastLotto[anyNum]))
                        break;
                    else
                        game.push(lastLotto[anyNum]);
                }
                else {
                    anyNum = Math.floor(Math.random() * 6);
                }
            }
            while (game.length < 6) {
                const num = Math.floor(Math.random() * 44) + 1;
                if (!game.includes(num) &&
                    (!exclude || !exclude.includes(num)) &&
                    !lastLotto.includes(num)) {
                    game.push(num);
                }
            }
            game.sort((a, b) => b - a);
            let minValue = 0;
            let maxValue = 0;
            for (let i = 0; i < game.length - 1; i++) {
                minValue += game[i] - game[i + 1];
            }
            for (const g of game) {
                maxValue += g;
            }
            if (maxValue < min || maxValue > max || minValue <= deviation) {
                i--;
                continue;
            }
            game.sort((a, b) => a - b);
            let check = false;
            for (let i = 0; i < 6; i++) {
                if (game[i] === game[i + 1] - 1) {
                    check = true;
                    break;
                }
            }
            if (consecution === 'on' && !check) {
                i--;
                continue;
            }
            if (consecution === 'off' && check) {
                i--;
                continue;
            }
            for (const b of beforeLottos) {
                if (b.toString() === game.toString()) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                result.push(game);
            }
        }
        return result;
    }
    async saveLotto(lottoDtos) {
        for (const lottoDto of lottoDtos) {
            const lotto = Lotto_entity_1.Lotto.create({
                id: (0, uuid_1.v4)(),
                round: lottoDto.round,
                lotto_number: JSON.stringify(lottoDto.lotto),
            });
            await this.lottoRepository.save(lotto);
        }
        this.logger.log('Success Enter Lotto Data');
        return true;
    }
    async getLottos() {
        return this.lottoRepository.find({
            select: { lotto_number: true },
        });
    }
    async getLastLotto() {
        const lotto = await this.lottoRepository.find({
            select: { lotto_number: true, round: true },
            order: { round: 'DESC' },
            take: 1,
        });
        return lotto;
    }
};
LottoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Lotto_entity_1.Lotto)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LottoService);
exports.LottoService = LottoService;
//# sourceMappingURL=lotto.service.js.map