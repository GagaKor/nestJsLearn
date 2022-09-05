import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./entities/User.entity";
import { Response } from "express";
import { Res } from "@nestjs/common/decorators";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }
  @Post("signin")
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Res({ passthrough: true }) res: Response) {
    const { username, accessToken, accessOption, refreshToken, refreshOption } = await this.authService.signIn(authCredentialsDto);
    res.cookie("Authentication", accessToken, accessOption);
    res.cookie("Refresh", refreshToken, refreshOption);
    return { username };
  }

  @Post("signup")
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.sighUp(authCredentialsDto);
  }

  @Delete("/:username")
  deleteUser(@Param("username") username: string): Promise<void> {
    return this.authService.deleteUser(username);
  }

  @Get("test")
  getTest(@Param("username") username: string) {
    return this.authService.getJwtRefreshToken(username);
  }
}
