import { Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { fileCheck, remove } from 'src/utils/lotto.excel';
import { getThisWeekLotto } from 'src/utils/lotto';
import { LottoService } from 'src/lotto/lotto.service';
import { downloadExcel } from './../utils/lotto.excel';
import { Lottos } from 'src/lotto/dto/lottos.dto';
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(private readonly lottoService: LottoService) {}

  static thisWeekLotto: Lottos[];

  @Cron('50 23 * * *', { name: 'Excel Download' })
  async downloadCron() {
    this.logger.log('TASK CALLED DownloadCron');

    TaskService.thisWeekLotto = await downloadExcel();
    if (TaskService.thisWeekLotto.length === 0) {
      this.logger.log('Success Download File');
    } else {
      this.logger.log(
        `Searched Numbers : ${JSON.stringify(TaskService.thisWeekLotto)}`,
      );
    }

    this.logger.log('Finish Cron Job');
  }

  @Cron('55 23 * * *', { name: 'Save Lotto' })
  async saveLottoCron() {
    this.logger.log('TASK CALLED SaveLottoCron');

    const lastLotto = await this.lottoService.getLastLotto();

    let round = 0;
    if (lastLotto.length > 0) {
      round = lastLotto[0].round;
    }

    let games: Lottos[];

    if (fileCheck()) {
      this.logger.log('FILE CHECKED');

      games = await getThisWeekLotto(round);

      remove();
      this.logger.log('Saved Lotto for Excel');
    } else {
      games = TaskService.thisWeekLotto;
      this.logger.log('Saved Lotto for Data');
    }

    if (games) {
      await this.lottoService.saveLotto(games);
    }

    this.logger.log('Finish Cron Job');
  }
}
