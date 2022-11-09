import { Module } from "@nestjs/common";
// import { LottoController } from "./lotto.controller";
// import { LottoService } from "./lotto.service";
import { AuthModule } from "./../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Lotto } from "./entities/Lotto.entity";
import { TypeOrmExModule } from "./../database/typeorm-ex.module";
// import { LottoRepository } from "./lotto.repository";

@Module({
  // imports: [AuthModule, TypeOrmModule.forFeature([Lotto]), TypeOrmExModule.forCustomRepository([LottoRepository])],
  // controllers: [LottoController],
  // providers: [LottoService],
})
export class LottoModule {}
