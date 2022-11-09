// import { CustomRepository } from "src/database/typeorm-ex.decorator";
// import { Lotto } from "src/lotto/entities/Lotto.entity";
// import { Repository } from "typeorm";
// import { SaveMyLottoDto } from "src/lotto/dto/Save-MyLottoDto";
// import { User } from "src/auth/entities/User.entity";

// @CustomRepository(Lotto)
// export class LottoRepository extends Repository<Lotto> {
//   async saveMyLotto(saveMyLottoDto: SaveMyLottoDto, user: User) {
//     const lotto = this.create({
//       myLotto: saveMyLottoDto.myLotto,
//       user,
//     });
//     await this.save(lotto);
//     return lotto;
//   }
// }
