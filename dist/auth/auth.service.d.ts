import { AuthCredentialsDto } from 'src/auth/dto/auth-credential.dto';
import { User } from 'src/auth/entities/User.entity';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthLoginDto } from 'src/auth/dto/auth-login.dto';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly usersReository;
    private jwtService;
    constructor(usersReository: Repository<User>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    sighUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authLoginDto: AuthLoginDto): Promise<{
        username: string;
        accessToken: string;
        accessOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
        refreshToken: string;
        refreshOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
    }>;
    getJwtRefreshToken(username: string): Promise<{
        refreshToken: string;
        refreshOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
    }>;
    getJwtAcessToken(user: User): Promise<{
        accessToken: string;
        accessOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
    }>;
    getUserRefreshTokenMatches(refreshToken: string, username: string): Promise<{
        result: boolean;
    }>;
    updateJwtRefershToken(refreshToken: string, username: string): Promise<void>;
    logOut(): {
        accessOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
        refreshOption: {
            domain: string;
            path: string;
            httpOnly: boolean;
            maxAge: number;
        };
    };
    removeRefreshToken(username: string): Promise<void>;
    deleteUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
}
