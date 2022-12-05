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

  @Cron('30 21 * * 6', { name: 'Excel Download' })
  async downloadCron() {
    this.logger.log('TASK CALLED DownloadCron');

    await downloadExcel();
    this.logger.log('Success Download File');

    this.logger.log('Finish Cron Job');
  }

  @Cron('35 21 * * 6', { name: 'Save Lotto' })
  async saveLottoCron() {
    this.logger.log('TASK CALLED SaveLottoCron');

    if (fileCheck()) {
      this.logger.log('FILE CHECKED');
      const lastLotto = await this.lottoService.getLastLotto();
      let round = 0;
      if (lastLotto.length > 0) {
        round = lastLotto[0].round;
      }
      const games = await getThisWeekLotto(round);

      if (games) {
        await this.lottoService.saveLotto(games);
      }

      remove();
      this.logger.log('Saved Lotto');
    }
    this.logger.log('Finish Cron Job');
  }
}
