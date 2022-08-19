import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersReository : UsersRepository
    ){}

    async sighUp(authCredentialsDto: AuthCredentialsDto):Promise<void>{
        await this.usersReository.createUser(authCredentialsDto);
    }
}
