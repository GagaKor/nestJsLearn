import { BaseEntity } from 'typeorm';
import { User } from 'src/auth/entities/User.entity';
export declare class LottoUser extends BaseEntity {
    id: string;
    myLotto: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
