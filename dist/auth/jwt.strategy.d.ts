import { Strategy } from 'passport-jwt';
import { User } from 'src/auth/entities/User.entity';
import { Request } from 'express';
import { Repository } from 'typeorm';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    private static extractJWT;
    validate(req: Request, { username }: {
        username: any;
    }): Promise<User>;
}
export {};
