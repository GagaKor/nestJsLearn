import { CustomRepository } from "src/database/typeorm-ex.decorator";
import { Lotto } from "src/lotto/entities/Lotto.entity";
import { Repository } from "typeorm";
import { Lottos } from "src/lotto/dto/lottos.dto";
import { v4 as uuid } from "uuid";

@CustomRepository(Lotto)
export class LottoRepository extends Repository<Lotto> {
  async saveLotto(lottoDto: Lottos) {
    const lotto = this.create({
      id: uuid(),
      round: lottoDto.round,
      lotto_number: JSON.stringify(lottoDto.lotto),
    });

    await this.save(lotto);

    return lotto;
  }
}
