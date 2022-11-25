import { LottoService } from 'src/lotto/lotto.service';
import { CreateLottoDto } from 'src/lotto/dto/create-lotto.dto';
import { SaveMyLottoDto } from 'src/lotto/dto/save-myLotto.dto';
import { User } from 'src/auth/entities/User.entity';
import { LottoUser } from 'src/lotto/entities/LottoUser.entity';
export declare class LottoController {
    private readonly lottoService;
    constructor(lottoService: LottoService);
    lottoFindByUser(user: User): Promise<LottoUser[]>;
    getThisWeekLotto(): Promise<import("./entities/Lotto.entity").Lotto[]>;
    createLotto(createLottoDto: CreateLottoDto): Promise<number[][]>;
    saveMyLotto(saveMyLotto: SaveMyLottoDto, user: User): Promise<LottoUser>;
}
