import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmExModule } from "src/configs/typeorm-ex.module";
import { AuthController } from "src/auth/auth.controller";
import { AuthService } from "src/auth/auth.service";
import { User } from "src/auth/entities/User.entity";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { RefreshJwtStrategy } from "src/auth/refreshJwt.strategy";
import { UsersRepository } from "src/auth/users.repository";

@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" }), JwtModule.register({}), TypeOrmModule.forFeature([User]), TypeOrmExModule.forCustomRepository([UsersRepository])],
  exports: [JwtStrategy, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshJwtStrategy],
})
export class AuthModule {}
