import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities/User.entity";
import { UsersRepository } from "./users.repository";
import * as config from "config";
import { Request } from "express";
import { AuthService } from "./auth.service";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private authService: AuthService,
  ) {
    super({
      secretOrKey: process.env.JWT_REFRESH_SECRET || config.get("jwt.refresh_secret"),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Refresh;
        },
      ]),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, { username }) {
    const refreshToken = req.cookies?.Refresh;
    await this.authService.getUserRefreshTokenMatches(refreshToken, username);
    const user: User = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
