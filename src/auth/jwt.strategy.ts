import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entities/User.entity";
import { UsersRepository } from "./users.repository";
import * as config from "config";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super({
      /** secreateOrkey : secreat key 입력
       * jwtFromRequest : jwt 받아오는 경로? 설정 Request의 cookies 에서 받아 옴
       */
      secretOrKey: process.env.JWT_SECRET || config.get("jwt.secret"),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, { username }) {
    const user: User = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
