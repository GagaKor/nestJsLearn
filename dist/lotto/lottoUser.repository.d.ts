import { LottoUser } from "src/lotto/entities/LottoUser.entity";
import { Repository } from "typeorm";
import { SaveMyLottoDto } from "src/lotto/dto/save-myLotto.dto";
import { User } from "src/auth/entities/User.entity";
export declare class LottoUserRepository extends Repository<LottoUser> {
    saveMyLotto(saveMyLottoDto: SaveMyLottoDto, user: User): Promise<LottoUser>;
}
