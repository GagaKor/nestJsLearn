import { SaveMyLottoDto } from 'src/lotto/dto/save-myLotto.dto';
import { User } from 'src/auth/entities/User.entity';
import { Repository } from 'typeorm';
import { LottoUser } from './entities/LottoUser.entity';
export declare class LottoUserService {
    private readonly lottoUserRepository;
    private readonly logger;
    constructor(lottoUserRepository: Repository<LottoUser>);
    lottoFindByUser(user: User): Promise<LottoUser[]>;
    saveMyLotto(saveMyLottoDto: SaveMyLottoDto, user: User): Promise<void>;
}
