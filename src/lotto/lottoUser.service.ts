import { Injectable } from '@nestjs/common';
import { SaveMyLottoDto } from 'src/lotto/dto/save-myLotto.dto';
import { User } from 'src/auth/entities/User.entity';
import { Logger } from '@nestjs/common/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LottoUser } from './entities/LottoUser.entity';
import { v4 as uuid } from 'uuid';
@Injectable()
export class LottoUserService {
  private readonly logger = new Logger('Lotto Service');
  constructor(
    @InjectRepository(LottoUser)
    private readonly lottoUserRepository: Repository<LottoUser>,
  ) {}

  async lottoFindByUser(user: User) {
    const lotto = this.lottoUserRepository.find({
      where: { user: { id: user.id } },
      relations: { user: true },
      select: { id: true, myLotto: true, user: { username: true } },
    });
    return lotto;
  }

  async saveMyLotto(saveMyLottoDto: SaveMyLottoDto, user: User) {
    const lotto = LottoUser.create({
      id: uuid(),
      myLotto: JSON.stringify(saveMyLottoDto.myLotto),
      user,
    });
    await this.lottoUserRepository.save(lotto);
  }
}
