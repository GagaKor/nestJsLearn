import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities/User.entity";
import { UsersRepository } from "./users.repository";
import * as config from "config";
import { Request } from "express";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: process.env.JWT_REFRESH_SECRET || config.get("jwt.refresh_secret"),
      jwtFromRequest: ExtractJwt.fromExtractors([request => request?.body?.refreshToekn]),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, username: string): Promise<User> {
    const refreshToken = req?.body?.refreshToekn;
    const user: User = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
