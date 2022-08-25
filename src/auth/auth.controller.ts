import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./entities/User.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.authService.findAll();
  }
  @Post("signin")
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post("signup")
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.sighUp(authCredentialsDto);
  }
  @Delete("/:username")
  deleteUser(@Param("username") username: string): Promise<void> {
    return this.authService.deleteUser(username);
  }
}
