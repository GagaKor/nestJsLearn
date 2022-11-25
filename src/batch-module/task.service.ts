import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { fileCheck, remove } from 'src/utils/lotto.excel';
import { getThisWeekLotto } from 'src/utils/lotto';
import { LottoService } from 'src/lotto/lotto.service';
import { downloadExcel } from './../utils/lotto.excel';
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(private readonly lottoService: LottoService) {}

  @Cron('10 * * * * *', { name: 'Excel Download' })
  async handleCron() {
    this.logger.log('TASK CALLED');
    await downloadExcel();
    const checker = setInterval(async () => {
      if (fileCheck()) {
        clearInterval(checker);
        const lastLotto = await this.lottoService.getLastLotto();
        let round = 0;
        if (lastLotto.length > 0) {
          round = lastLotto[0].round + 2;
        }
        const games = await getThisWeekLotto(round);

        if (games) {
          await this.lottoService.saveLotto(games);
        }

        remove();
        this.logger.log('Finish Cron Job');
      }
    }, 1000);
  }
}
