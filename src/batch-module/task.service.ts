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

  @Cron("15 21 * * 6", { name: "Excel Download" })
  async handleCron() {
    this.logger.log("TASK CALLED");
    const result = await downloadExcel();
    if (result) {
      const lastLotto = await this.lottoService.getLastLotto();
      let round = 0;
      if (lastLotto.length > 0) {
        round = lastLotto[0].round + 2;
      }
      const games = await getThisWeekLotto(round);
      let saveLotto: boolean;
      if (games) {
        saveLotto = await this.lottoService.saveLotto(games);
      }
      if (saveLotto) {
        setTimeout(() => {
          remove();
        }, 1000 * 3);
      }
    }
    this.logger.log("Finish Cron Job");
  }
}
