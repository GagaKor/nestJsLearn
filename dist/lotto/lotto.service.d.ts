import { LottoUserRepository } from 'src/lotto/lottoUser.repository';
import { CreateLottoDto } from 'src/lotto/dto/create-lotto.dto';
import { SaveMyLottoDto } from 'src/lotto/dto/save-myLotto.dto';
import { Lottos } from 'src/lotto/dto/lottos.dto';
import { User } from 'src/auth/entities/User.entity';
import { LottoRepository } from 'src/lotto/lotto.repository';
export declare class LottoService {
    private readonly lottoUserRepository;
    private readonly lottoRepository;
    private readonly logger;
    constructor(lottoUserRepository: LottoUserRepository, lottoRepository: LottoRepository);
    lottoFindByUser(user: User): Promise<import("./entities/LottoUser.entity").LottoUser[]>;
    createLotto(createLottoDto: CreateLottoDto): Promise<number[][]>;
    saveMyLotto(saveMyLottoDto: SaveMyLottoDto, user: User): Promise<import("./entities/LottoUser.entity").LottoUser>;
    saveLotto(lottoDtos: Lottos[]): Promise<boolean>;
    getLottos(): Promise<import("./entities/Lotto.entity").Lotto[]>;
    getLastLotto(): Promise<import("./entities/Lotto.entity").Lotto[]>;
}
