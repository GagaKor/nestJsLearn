import { AuthService } from "src/auth/auth.service";
import { AuthCredentialsDto } from "src/auth/dto/auth-credential.dto";
import { User } from "src/auth/entities/User.entity";
import { Response } from "express";
import { AuthLoginDto } from "src/auth/dto/auth-login.dto";
export declare class AuthController {
    private readonly authService;
    private logger;
    constructor(authService: AuthService);
    findAll(): Promise<User[]>;
    signIn(authLoginDto: AuthLoginDto, res: Response): Promise<{
        username: string;
    }>;
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    refresh(res: Response, user: User): Promise<User>;
    logOut(res: Response, user: User): Promise<void>;
    deleteUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    getTest(username: string): Promise<{
        refreshToken: string;
        refreshOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
    }>;
}
