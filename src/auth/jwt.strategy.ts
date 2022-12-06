import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/auth/entities/User.entity';
import { Request } from 'express';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      /** secreateOrkey : secreat key 입력
       * jwtFromRequest : jwt 받아오는 경로? 설정 Request의 cookies 에서 받아 옴
       */
      secretOrKey: process.env.JWT_SECRET,
      // jwtFromRequest: ExtractJwt.fromExtractors([
      //   (request: Request) => {
      //     return request?.cookies?.Authentication;
      //   },
      // ]),
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtStrategy.extractJWT,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      passReqToCallback: true,
    });
  }
  private static extractJWT(req: Request) {
    return req?.cookies?.Authentication;
  }

  async validate(req: Request, { username }) {
    const user: User = await this.usersRepository.findOne({
      where: { username },
      select: ['id', 'username', 'refreshToken', 'role'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
