import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./entities/User.entity";
import { Response } from "express";
import { Res } from "@nestjs/common/decorators";
import { JwtRefreshGuard } from "./jwtRefreshToken.guard";
import { GetUser } from "./get-user.decorator";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
export class AuthController {
  private logger = new Logger("Boards");
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }
  @Post("login")
  async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto, @Res({ passthrough: true }) res: Response) {
    const { username, accessToken, accessOption, refreshToken, refreshOption } = await this.authService.signIn(authCredentialsDto);
    res.cookie("Authentication", accessToken, accessOption);
    res.cookie("Refresh", refreshToken, refreshOption);
    this.logger.verbose(`${username} is login`);
    return { username };
  }

  @Post("signup")
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.sighUp(authCredentialsDto);
  }

  @Post("refresh")
  @UseGuards(JwtRefreshGuard)
  async refresh(@Res({ passthrough: true }) res: Response, @GetUser() user: User) {
    if (user) {
      this.logger.verbose(`${user.username} refresh Token`);
      const { accessToken, accessOption } = await this.authService.getJwtAcessToken(user);
      res.cookie("Authentication", accessToken, accessOption);
      return user;
    }
  }

  @Get("logout")
  @UseGuards(JwtRefreshGuard)
  async logOut(@Res({ passthrough: true }) res: Response, @GetUser() user: User) {
    const { accessOption, refreshOption } = this.authService.logOut();
    await this.authService.removeRefreshToken(user.username);
    this.logger.verbose(`${user.username} log out`);
    res.cookie("Authentication", "", accessOption);
    res.cookie("Refresh", "", refreshOption);
  }

  @Delete()
  @UseGuards(AuthGuard())
  deleteUser(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.deleteUser(authCredentialsDto);
  }

  @Get("test")
  getTest(@Param("username") username: string) {
    return this.authService.getJwtRefreshToken(username);
  }
}
