import { Strategy } from "passport-jwt";
import { User } from "src/auth/entities/User.entity";
import { UsersRepository } from "src/auth/users.repository";
import { Request } from "express";
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    private static extractJWT;
    validate(req: Request, { username }: {
        username: any;
    }): Promise<User>;
}
export {};
