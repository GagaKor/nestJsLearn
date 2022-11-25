import { Repository } from "typeorm";
import { AuthCredentialsDto } from "src/auth/dto/auth-credential.dto";
import { User } from "src/auth/entities/User.entity";
import { AuthLoginDto } from "src/auth/dto/auth-login.dto";
export declare class UsersRepository extends Repository<User> {
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authLoginDto: AuthLoginDto): Promise<User>;
}
