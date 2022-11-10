import { Injectable } from "@nestjs/common";
import { Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { downloadExcel, remove } from "src/utils/lotto.excel";
import { getThisWeekLotto } from "src/utils/lotto";
import { LottoService } from "src/lotto/lotto.service";
@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(private readonly lottoService: LottoService) {}

  @Cron("*/40 * * * * *", { name: "Excel Download" })
  async handleCron() {
    this.logger.log("TASK CALLED");
    const result = await downloadExcel();
    if (result) {
      const lastRound = await this.lottoService.getLastRound();
      const games = await getThisWeekLotto(lastRound);
      const saveLotto = this.lottoService.saveLotto(games);
      if (saveLotto) {
        setTimeout(() => {
          remove();
        }, 1000 * 3);
      }
    }
  }
}
