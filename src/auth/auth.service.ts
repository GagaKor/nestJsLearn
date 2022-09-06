import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./entities/User.entity";
import { UsersRepository } from "./users.repository";
import { JwtService } from "@nestjs/jwt/dist";
import * as config from "config";
import * as bcrypt from "bcryptjs";

@Injectable()
export class AuthService {
  constructor(private readonly usersReository: UsersRepository, private jwtService: JwtService) {}

  async findAll() {
    return await this.usersReository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersReository.findOne({ where: { username } });
  }

  async sighUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.usersReository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const user = await this.usersReository.signIn(authCredentialsDto);
    const { accessToken, accessOption } = await this.getJwtAcessToken(user);
    const { refreshToken, refreshOption } = await this.getJwtRefreshToken(user.username);

    await this.updateJwtRefershToken(refreshToken, authCredentialsDto.username);

    return { username: user.username, accessToken, accessOption, refreshToken, refreshOption };
  }
  async getJwtRefreshToken(username: string) {
    const payload = { username };
    let refreshToken = await this.jwtService.sign(payload, { secret: config.get("jwt.refresh_secret"), expiresIn: "7d" });
    return {
      refreshToken,
      refreshOption: {
        domain: "localhost",
        path: "/",
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      },
    };
  }

  async getJwtAcessToken(user: User) {
    const payload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload, { secret: config.get("jwt.secret"), expiresIn: "1m" });
    return {
      accessToken,
      accessOption: {
        domain: "localhost",
        path: "/",
        httpOnly: true,
        maxAge: 1000 * 60 * 5,
      },
    };
  }
  async getUserRefreshTokenMatches(refreshToken: string, username: string) {
    const user = await this.usersReository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException("Can not find user");
    }
    const isRefreshTokenMatch = await bcrypt.compare(refreshToken, user.refreshToken);
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
        domain: "localhost",
        path: "/",
        httpOnly: true,
        maxAge: 0,
      },
      refreshOption: {
        domain: "localhost",
        path: "/",
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

  async deleteUser(username: string): Promise<void> {
    const user = await this.findByUsername(username);

    await this.usersReository.delete(user.id);
  }
}
