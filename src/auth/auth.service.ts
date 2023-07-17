import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credential.dto';
import { User } from 'src/auth/entities/User.entity';
import { JwtService } from '@nestjs/jwt/dist';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcryptjs';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersReository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return await this.usersReository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersReository.findOne({ where: { username } });
  }

  async sighUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, role } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = User.create({
      id: uuid(),
      username,
      password: hashedPassword,
      role,
    });
    try {
      await this.usersReository.save(user);
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authLoginDto: AuthLoginDto) {
    const { username, password } = authLoginDto;

    const user = await this.usersReository.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('login Failed');
    }
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
        secure: true,
        path: '/',
        httpOnly: process.env.NODE_ENV === 'prod',
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
        secure: true,
        path: '/',
        httpOnly: process.env.NODE_ENV === 'prod',
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
