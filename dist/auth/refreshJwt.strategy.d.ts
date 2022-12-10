import { Strategy } from 'passport-jwt';
import { User } from 'src/auth/entities/User.entity';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Repository } from 'typeorm';
declare const RefreshJwtStrategy_base: new (...args: any[]) => Strategy;
export declare class RefreshJwtStrategy extends RefreshJwtStrategy_base {
    private usersRepository;
    private authService;
    constructor(usersRepository: Repository<User>, authService: AuthService);
    validate(req: Request, { username }: {
        username: any;
    }): Promise<User>;
}
export {};
