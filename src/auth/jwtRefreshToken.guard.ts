import { Injectable, Request } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtRefreshGuard extends AuthGuard("jwt-refresh-token") {}
