import { CustomRepository } from "src/configs/typeorm-ex.decorator";
import { Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./entities/User.entity";

@CustomRepository(User)
export class UsersRepository extends Repository<User>{
    async createUser(authCredentialsDto : AuthCredentialsDto): Promise<void>{
        const {username, password} = authCredentialsDto;
        const user = this.create({username, password});
        await this.save(user);
    }
}