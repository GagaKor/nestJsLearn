import { BadRequestException, PipeTransform } from '@nestjs/common';
import { Role } from '../role.enum';

export class RoleValidationPipe implements PipeTransform {
  readonly StatusOptions = [Role.Admin, Role.User];

  transform(value: any) {
    value = value.toLowerCase();
    if (!this.isStatus(value))
      throw new BadRequestException(`${value} isn't in the status options`);

    return value;
  }

  private isStatus(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1;
  }
}
