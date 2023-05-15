import { Module } from '@nestjs/common';
import { TwelController } from './twel.controller';
import { TwelService } from './twel.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Twel } from './entities/Twel.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Twel])],
  exports: [TwelService],
  controllers: [TwelController],
  providers: [TwelService],
})
export class TwelModule {}
