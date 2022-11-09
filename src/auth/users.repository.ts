import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./entities/User.entity";
import * as bcrypt from "bcryptjs";
import { AuthLoginDto } from "./dto/auth-login.dto";

@CustomRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, role } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashedPassword, role });
    try {
      await this.save(user);
    } catch (err) {
      if (err.code === "ER_DUP_ENTRY") {
        throw new ConflictException("Existing username");
      } else {
        throw new InternalServerErrorException(err);
      }
    }
  }

  async signIn(authLoginDto: AuthLoginDto): Promise<User> {
    const { username, password } = authLoginDto;

    const user = await this.findOne({ where: { username } });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    } else {
      throw new UnauthorizedException("login Failed");
    }
  }
}
