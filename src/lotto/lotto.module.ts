import { Module } from "@nestjs/common";
import { LottoController } from "src/lotto/lotto.controller";
import { LottoService } from "src/lotto/lotto.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lotto } from "src/lotto/entities/Lotto.entity";
import { TypeOrmExModule } from "src/database/typeorm-ex.module";
import { LottoRepository } from "src/lotto/lotto.repository";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Lotto]), TypeOrmExModule.forCustomRepository([LottoRepository])],
  exports: [LottoService],
  controllers: [LottoController],
  providers: [LottoService],
})
export class LottoModule {}
