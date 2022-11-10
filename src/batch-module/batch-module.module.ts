import { Module } from "@nestjs/common";
import { TaskService } from "src/batch-module/task.service";
import { ScheduleModule } from "@nestjs/schedule";
import { LottoModule } from "src/lotto/lotto.module";

@Module({
  imports: [ScheduleModule.forRoot(), LottoModule],
  providers: [TaskService],
})
export class BatchModuleModule {}
