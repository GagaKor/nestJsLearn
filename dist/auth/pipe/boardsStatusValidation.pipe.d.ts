import { PipeTransform } from "@nestjs/common";
import { Role } from "../role.enum";
export declare class RoleValidationPipe implements PipeTransform {
    readonly StatusOptions: Role[];
    transform(value: any): any;
    private isStatus;
}
