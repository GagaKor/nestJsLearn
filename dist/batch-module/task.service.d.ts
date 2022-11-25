import { LottoService } from 'src/lotto/lotto.service';
export declare class TaskService {
    private readonly lottoService;
    private readonly logger;
    constructor(lottoService: LottoService);
    downloadCron(): Promise<void>;
    saveLottoCron(): Promise<void>;
}
