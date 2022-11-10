import { BadRequestException, Injectable } from "@nestjs/common";
import { LottoUserRepository } from "src/lotto/lottoUser.repository";
import { CreateLottoDto } from "src/lotto/dto/create-lotto.dto";
import { SaveMyLottoDto } from "src/lotto/dto/save-MyLottodto";
import { Lottos } from "src/lotto/dto/lottos.dto";
import { User } from "src/auth/entities/User.entity";
import { LottoRepository } from "src/lotto/lotto.repository";
import { LottoUser } from "src/lotto/entities/LottoUser.entity";

@Injectable()
export class LottoService {
  constructor(private readonly lottoUserRepository: LottoUserRepository, private readonly lottoRepository: LottoRepository) {}

  async lottoFindByUser(user: User) {
    const lotto = this.lottoUserRepository.find({
      where: { user: { id: user.id } },
      relations: { user: true },
      select: { id: true, myLotto: true, user: { username: true } },
    });
    return lotto;
  }

  createLotto(createLottoDto: CreateLottoDto): number[] {
    const { playGame, include, exclude } = createLottoDto;
    if (include && include.length > 6) throw new BadRequestException("Over 6 numbers");
    let result = [];
    for (let i = 0; i < playGame; i++) {
      let game = [];
      if (include && include.length > 0) {
        game = [...include];
      }
      while (game.length < 6) {
        const num = Math.floor(Math.random() * 44) + 1;
        if (game.indexOf(num) === -1 && (!exclude || exclude.indexOf(num) === -1)) game.push(num);
      }
      result.push(game.sort((a, b) => a - b));
    }
    return result;
  }
  async saveMyLotto(saveMyLottoDto: SaveMyLottoDto, user: User) {
    return await this.lottoUserRepository.saveMyLotto(saveMyLottoDto, user);
  }

  async saveLotto(lottoDtos: Lottos[]) {
    try {
      for (let lottoDto of lottoDtos) {
        await this.lottoRepository.saveLotto(lottoDto);
      }
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  async getLastRound() {
    const lotto = await this.lottoRepository.findOne({
      select: { round: true },
      order: { round: "DESC" },
    });
    const result = lotto.round;
    return result ? result : 0;
  }
}
