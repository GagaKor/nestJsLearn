import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { LottoLog } from './entities/LottoLog.entity';
@Injectable()
export class LottoLogService {
  constructor(
    @InjectRepository(LottoLog)
    private readonly lottoLogRepository: Repository<LottoLog>,
  ) {}

  async saveLottoLog(round: number, lottoNumbers: number[][]) {
    for (const lottoNumber of lottoNumbers) {
      const lottoLog = LottoLog.create({
        id: uuid(),
        lotto_number: JSON.stringify(lottoNumber),
        round: round + 1,
      });
      await this.lottoLogRepository.save(lottoLog);
    }
  }

  async findWinNumber(round: number, winNumbers: number[]) {
    const logs = await this.lottoLogFindByRound(round);

    const logsLottoNumbers = logs[0].map((log) => JSON.parse(log.lotto_number));

    const winGames = {
      round,
      win: [],
      weekWinNumber: winNumbers,
      total: logs[1],
    };

    logsLottoNumbers.forEach((logNums) => {
      const check = winNumbers.filter((v) => logNums.includes(v));
      if (check.length > 2) {
        winGames.win.push({ lotto_number: logNums, cnt: check.length });
      }
    });

    winGames.win.sort((a, b) => b - a);

    return winGames;
  }

  async lottoLogFindByRound(round: number) {
    return await this.lottoLogRepository.findAndCount({ where: { round } });
  }

  async lottoLogFindLastRound() {
    const result = await this.lottoLogRepository.find({
      select: { round: true },
      order: { round: 'DESC' },
      take: 1,
    });

    return result[0];
  }
}
