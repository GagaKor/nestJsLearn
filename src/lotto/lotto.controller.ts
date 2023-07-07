import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Query,
  RequestTimeoutException,
} from '@nestjs/common';
import { LottoService } from 'src/lotto/lotto.service';
import { CreateLottoDto } from 'src/lotto/dto/create-lotto.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { SaveMyLottoDto } from 'src/lotto/dto/save-myLotto.dto';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/auth/entities/User.entity';
import { LottoUser } from 'src/lotto/entities/LottoUser.entity';
import { LottoUserService } from './lottoUser.service';
import { LottoLogService } from './lottoLog.service';
import { purchaseLottoSite } from 'src/utils/lotto.excel';
import { PurchaseLottoDto } from './dto/purchaseLotto.dts';

@Controller('lotto')
export class LottoController {
  constructor(
    private readonly lottoService: LottoService,
    private readonly lottoUserService: LottoUserService,
    private readonly lottoLogService: LottoLogService,
  ) {}
  @Get()
  lottoFindByUser(@GetUser() user: User): Promise<LottoUser[]> {
    return this.lottoUserService.lottoFindByUser(user);
  }

  @Get('thisweek')
  getThisWeekLotto() {
    return this.lottoService.getLastLotto();
  }

  @Post()
  async createLotto(
    @Body() createLottoDto: CreateLottoDto,
  ): Promise<number[][]> {
    const { playGame, include, exclude, deviation, consecution, max, min } =
      createLottoDto;

    if (include && include.length > 6) throw new Error('Over 6 number');

    let data = await this.getThisWeekLotto();
    const round = data[0].round;
    const lastLotto = JSON.parse(data[0].lotto_number).map((str: string) => {
      return Number(str);
    });
    const beforeLottos: number[][] = [];
    data = await this.lottoService.getLottos();
    for (const d of data) {
      const parseIntArr = JSON.parse(d.lotto_number).map((str: string) => {
        return Number(str);
      });
      beforeLottos.push(parseIntArr);
    }
    const lottoNumbers: number[][] = [];
    if (include.length === 6) {
      lottoNumbers.push(include);
      return lottoNumbers;
    }
    let countLoad = 0;
    for (let i = 0; i < playGame; i++) {
      countLoad++;
      if (countLoad > 5_000_000) {
        throw new RequestTimeoutException(`Can not resolve your order`);
      }
      let flag = true;
      let game: number[] = [];
      let anyNum = Math.floor(Math.random() * 6);
      if (include && include.length > 0) {
        game = [...include];
      }
      const gameLength = game.length;

      //전 회차 번호 1개 무조건 포함
      while (game.length < gameLength + 1) {
        if (exclude && !exclude.includes(lastLotto[anyNum])) {
          //포함 수에 전 회차 번호가 있으면 추가하지 않음
          if (game.includes(lastLotto[anyNum])) break;
          else game.push(lastLotto[anyNum]);
        } else {
          anyNum = Math.floor(Math.random() * 6);
        }
      }

      //random 번호
      while (game.length < 6) {
        const num = Math.floor(Math.random() * 44) + 1;
        if (
          !game.includes(num) &&
          (!exclude || !exclude.includes(num)) &&
          !lastLotto.includes(num)
        ) {
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
      //범위 조정
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

      const gameString = JSON.stringify(game);
      //1회차~ 중복시 제와
      for (const b of beforeLottos) {
        const beforString = JSON.stringify(b);
        if (beforString === gameString) {
          flag = false;
          break;
        }
      }

      //같은회차 같은 번호 제외
      const logs = await this.lottoLogService.lottoLogFindByRound(round + 1);
      for (const log of logs[0]) {
        if (log.lotto_number === gameString) {
          flag = false;
          break;
        }
      }
      if (flag) {
        lottoNumbers.push(game);
      }
    }

    await this.lottoLogService.saveLottoLog(round, lottoNumbers);

    return lottoNumbers;
  }

  @Post('save')
  @UseGuards(AuthGuard)
  saveMyLotto(@Body() saveMyLotto: SaveMyLottoDto, @GetUser() user: User) {
    return this.lottoUserService.saveMyLotto(saveMyLotto, user);
  }

  @Get('winner')
  async findByRound(@Query('round') round: number) {
    const winNumber = await this.lottoService.findByRound(round);
    return this.lottoLogService.findWinNumber(
      round,
      JSON.parse(winNumber.lotto_number),
    );
  }

  @Get('lastround')
  async getLastRound() {
    return await this.lottoService.getLastRound();
  }

  @Get('select-list')
  async getSelectList(@Query('round') round: number) {
    const logs = await this.lottoLogService.lottoLogFindByRound(round);
    const lotto_number = logs[0].map((log) => JSON.parse(log.lotto_number));
    const result = {
      round,
      lotto_number,
      total: logs[1],
    };

    return result;
  }

  @Get('select-last-round')
  async getSelectLastRound() {
    return await this.lottoLogService.lottoLogFindLastRound();
  }

  @Post('purchase-lotto')
  async purchaseLotto(@Body() purchaseLottoDto: PurchaseLottoDto) {
    await purchaseLottoSite(purchaseLottoDto);
    return true;
  }
}
