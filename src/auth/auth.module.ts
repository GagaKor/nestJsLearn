import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmExModule } from 'src/configs/typeorm-ex.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/User.entity';
import { UsersRepository } from './users.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    TypeOrmExModule.forCustomRepository([UsersRepository])],
  exports:[AuthService],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
