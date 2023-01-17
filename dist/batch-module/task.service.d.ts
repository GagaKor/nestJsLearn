import { LottoService } from 'src/lotto/lotto.service';
import { Lottos } from 'src/lotto/dto/lottos.dto';
export declare class TaskService {
    private readonly lottoService;
    private readonly logger;
    constructor(lottoService: LottoService);
    static thisWeekLotto: Lottos[];
    downloadCron(): Promise<void>;
    saveLottoCron(): Promise<void>;
}
