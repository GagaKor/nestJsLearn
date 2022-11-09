import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmExModule } from "src/configs/typeorm-ex.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { User } from "./entities/User.entity";
import { JwtStrategy } from "./jwt.strategy";
import { RefreshJwtStrategy } from "./refreshJwt.strategy";
import { UsersRepository } from "./users.repository";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), JwtModule.register({}), TypeOrmModule.forFeature([User]), TypeOrmExModule.forCustomRepository([UsersRepository])],
  exports: [JwtStrategy, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
