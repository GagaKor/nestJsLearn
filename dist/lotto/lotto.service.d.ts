import { CreateLottoDto } from 'src/lotto/dto/create-lotto.dto';
import { Lottos } from 'src/lotto/dto/lottos.dto';
import { Lotto } from './entities/Lotto.entity';
import { Repository } from 'typeorm';
export declare class LottoService {
    private readonly lottoRepository;
    private readonly logger;
    constructor(lottoRepository: Repository<Lotto>);
    createLotto(createLottoDto: CreateLottoDto): Promise<number[][]>;
    saveLotto(lottoDtos: Lottos[]): Promise<boolean>;
    getLottos(): Promise<Lotto[]>;
    getLastLotto(): Promise<Lotto[]>;
}
