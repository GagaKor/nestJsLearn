import { PartialType } from "@nestjs/mapped-types";
import { AuthCredentialsDto } from "./auth-credential.dto";

export class AuthLoginDto extends PartialType(AuthCredentialsDto) { }