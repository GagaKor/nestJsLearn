import { Injectable } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./entities/User.entity";
import { UsersRepository } from "./users.repository";
@Injectable()
export class AuthService {
  constructor(private readonly usersReository: UsersRepository) {}

  async findAll() {
    return await this.usersReository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return this.usersReository.findOne({ where: { username } });
  }

  async sighUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.usersReository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.usersReository.signIn(authCredentialsDto);
  }

  async deleteUser(username: string): Promise<void> {
    const user = await this.findByUsername(username);
    console.log(user);
    await this.usersReository.delete(user.id);
  }
}
