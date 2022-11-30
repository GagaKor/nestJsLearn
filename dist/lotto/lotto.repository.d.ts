import { Lotto } from 'src/lotto/entities/Lotto.entity';
import { Repository } from 'typeorm';
import { Lottos } from 'src/lotto/dto/lottos.dto';
export declare class LottoRepository extends Repository<Lotto> {
    saveLotto(lottoDto: Lottos): Promise<Lotto>;
}
