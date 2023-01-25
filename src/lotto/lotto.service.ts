import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateLottoDto } from 'src/lotto/dto/create-lotto.dto';
import { Lottos } from 'src/lotto/dto/lottos.dto';
import { Logger } from '@nestjs/common/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Lotto } from './entities/Lotto.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LottoLog } from './entities/LottoLog.entity';
@Injectable()
export class LottoService {
  private readonly logger = new Logger('Lotto Service');
  constructor(
    @InjectRepository(Lotto)
    private readonly lottoRepository: Repository<Lotto>,
  ) {}

  async createLotto(createLottoDto: CreateLottoDto): Promise<number[][]> {
    const { playGame, include, exclude, deviation, consecution, max, min } =
      createLottoDto;

    if (include && include.length > 6) throw new Error('Over 6 number');

    let data = await this.getLastLotto();
    const lastLotto = JSON.parse(data[0].lotto_number).map((str: string) => {
      return Number(str);
    });
    const beforeLottos: number[][] = [];
    data = await this.getLottos();
    for (const d of data) {
      const parseIntArr = JSON.parse(d.lotto_number).map((str: string) => {
        return Number(str);
      });
      beforeLottos.push(parseIntArr);
    }
    const result: number[][] = [];
    if (include.length === 6) {
      result.push(include);
      return result;
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

  async saveLotto(lottoDtos: Lottos[]) {
    for (const lottoDto of lottoDtos) {
      const lotto = Lotto.create({
        id: uuid(),
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

  async findByRound(round: number) {
    return await this.lottoRepository.findOne({ where: { round } });
  }
}
