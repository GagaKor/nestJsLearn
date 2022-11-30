import { CustomRepository } from 'src/database/typeorm-ex.decorator';
import { LottoUser } from 'src/lotto/entities/LottoUser.entity';
import { Repository } from 'typeorm';
import { SaveMyLottoDto } from 'src/lotto/dto/save-myLotto.dto';
import { User } from 'src/auth/entities/User.entity';

@CustomRepository(LottoUser)
export class LottoUserRepository extends Repository<LottoUser> {
  async saveMyLotto(saveMyLottoDto: SaveMyLottoDto, user: User) {
    const lotto = this.create({
      myLotto: JSON.stringify(saveMyLottoDto.myLotto),
      user,
    });
    await this.save(lotto);
    return lotto;
  }
}
