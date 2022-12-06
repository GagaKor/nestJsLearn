import { Module } from '@nestjs/common';
import { LottoController } from 'src/lotto/lotto.controller';
import { LottoService } from 'src/lotto/lotto.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LottoUser } from 'src/lotto/entities/LottoUser.entity';
import { Lotto } from 'src/lotto/entities/Lotto.entity';
import { LottoUserService } from './lottoUser.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([LottoUser, Lotto])],
  exports: [LottoService, LottoUserService],
  controllers: [LottoController],
  providers: [LottoService, LottoUserService],
})
export class LottoModule {}
