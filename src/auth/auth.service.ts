import { Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./entities/User.entity";
import { UsersRepository } from "./users.repository";
import { JwtService } from "@nestjs/jwt/dist";
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

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const user = await this.usersReository.signIn(authCredentialsDto);
    const payload = { username: user.username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async deleteUser(username: string): Promise<void> {
    const user = await this.findByUsername(username);

    await this.usersReository.delete(user.id);
  }
}
