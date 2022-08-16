import { IsNotEmpty, IsString } from "class-validator";

export class CreateBaordDto{
    @IsNotEmpty()
    @IsString()
    readonly title:string;
    
    @IsNotEmpty()
    @IsString()
    readonly content:string;
    
}