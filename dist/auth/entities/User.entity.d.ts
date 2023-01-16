import { Board } from 'src/boards/entities/Board.entity';
import { Comment } from 'src/comments/entities/Comment.entity';
import { BaseEntity } from 'typeorm';
import { Role } from 'src/auth/role.enum';
import { LottoUser } from 'src/lotto/entities/LottoUser.entity';
export declare class User extends BaseEntity {
    id: string;
    username: string;
    password: string;
    role: Role;
    refreshToken: string;
    boards: Board[];
    comment: Comment[];
    lottos: LottoUser[];
    createdAt: Date;
    updatedAt: Date;
}
