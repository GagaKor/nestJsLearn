import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/auth/entities/User.entity';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private authService: AuthService,
  ) {
    super({
      secretOrKey: process.env.JWT_REFRESH_SECRET,
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
