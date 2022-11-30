import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credential.dto';
import { User } from 'src/auth/entities/User.entity';
import { UsersRepository } from 'src/auth/users.repository';
import { JwtService } from '@nestjs/jwt/dist';

import * as bcrypt from 'bcryptjs';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersReository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return await this.usersReository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersReository.findOne({ where: { username } });
  }

  async sighUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.usersReository.createUser(authCredentialsDto);
  }

  async signIn(authLoginDto: AuthLoginDto) {
    const user = await this.usersReository.signIn(authLoginDto);
    const { accessToken, accessOption } = await this.getJwtAcessToken(user);
    const { refreshToken, refreshOption } = await this.getJwtRefreshToken(
      user.username,
    );

    await this.updateJwtRefershToken(refreshToken, authLoginDto.username);

    return {
      username: user.username,
      accessToken,
      accessOption,
      refreshToken,
      refreshOption,
    };
  }
  async getJwtRefreshToken(username: string) {
    const payload = { username };

    const refreshToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.REFRESH_EXPPIRESIN,
    });
    return {
      refreshToken,
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    };
  }

  async getJwtAcessToken(user: User) {
    const payload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.AUTH_EXPPIRESIN,
    });
    return {
      accessToken,
      accessOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    };
  }
  async getUserRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.usersReository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException('Can not find user');
    }
    const isRefreshTokenMatch = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (isRefreshTokenMatch) {
      return { result: true };
    } else {
      throw new UnauthorizedException();
    }
  }

  async updateJwtRefershToken(refreshToken: string, username: string) {
    if (refreshToken) {
      refreshToken = await bcrypt.hash(refreshToken, 10);
    }
    await this.usersReository.update({ username }, { refreshToken });
  }

  logOut() {
    return {
      accessOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        maxAge: 0,
      },
    };
  }

  async removeRefreshToken(username: string) {
    const user = await this.usersReository.findOneBy({ username });
    user.refreshToken = null;
    await this.usersReository.save(user);
  }

  async deleteUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const user = await this.findByUsername(authCredentialsDto.username);
    if (!user) throw new UnauthorizedException('Can not find user');
    const matchPassword = await bcrypt.compare(
      authCredentialsDto.password,
      user.password,
    );
    if (!matchPassword)
      throw new UnauthorizedException(`${user.username} Password Incorrect`);
    await this.usersReository.delete(user.id);
  }
}
