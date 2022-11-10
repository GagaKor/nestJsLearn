import { Module } from "@nestjs/common";
import { LottoController } from "src/lotto/lotto.controller";
import { LottoService } from "src/lotto/lotto.service";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LottoUser } from "src/lotto/entities/LottoUser.entity";
import { TypeOrmExModule } from "src/database/typeorm-ex.module";
import { LottoUserRepository } from "src/lotto/lottoUser.repository";
import { LottoRepository } from "src/lotto/lotto.repository";
import { Lotto } from "src/lotto/entities/Lotto.entity";

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([LottoUser, Lotto]), TypeOrmExModule.forCustomRepository([LottoUserRepository, LottoRepository])],
  exports: [LottoService],
  controllers: [LottoController],
  providers: [LottoService],
})
export class LottoModule {}
