import { BadRequestException, Injectable } from "@nestjs/common";
import { LottoRepository } from "./lotto.repository";
import { CreateLottoDto } from "./dto/create-lotto.dto";
import { SaveMyLottoDto } from "./dto/Save-MyLottoDto";
import { Lottos } from "./dto/lottos.dto";
import { User } from "src/auth/entities/User.entity";

@Injectable()
export class LottoService {
  constructor(private readonly lottoRepository: LottoRepository) {}

  async lottoFindByUser(user: User) {
    const lotto = this.lottoRepository.find({
      where: { user: { id: user.id } },
      relations: { user: true },
      select: { id: true, myLotto: true, user: { username: true } },
    });
    return lotto;
  }

  createLotto(createLottoDto: CreateLottoDto): Lottos[] {
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
    return await this.lottoRepository.saveMyLotto(saveMyLottoDto, user);
  }
}
