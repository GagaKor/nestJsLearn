import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';
import { LottoService } from 'src/lotto/lotto.service';
import { CreateLottoDto } from 'src/lotto/dto/create-lotto.dto';
import { AuthGuard } from 'src/auth/security/auth.guard';
import { SaveMyLottoDto } from 'src/lotto/dto/save-myLotto.dto';
import { GetUser } from 'src/decorator/get-user.decorator';
import { User } from 'src/auth/entities/User.entity';
import { LottoUser } from 'src/lotto/entities/LottoUser.entity';
import { LottoUserService } from './lottoUser.service';
import { LottoLogService } from './lottoLog.service';

@Controller('lotto')
export class LottoController {
  constructor(
    private readonly lottoService: LottoService,
    private readonly lottoUserService: LottoUserService,
    private readonly lottoLogService: LottoLogService,
  ) {}
  @Get()
  lottoFindByUser(@GetUser() user: User): Promise<LottoUser[]> {
    return this.lottoUserService.lottoFindByUser(user);
  }

  @Get('thisweek')
  getThisWeekLotto() {
    return this.lottoService.getLastLotto();
  }

  @Post()
  async createLotto(
    @Body() createLottoDto: CreateLottoDto,
  ): Promise<number[][]> {
    const lastLotto = await this.getThisWeekLotto();
    const lottoNumbers = await this.lottoService.createLotto(createLottoDto);
    console.log(lottoNumbers, lastLotto);
    await this.lottoLogService.saveLottoLog(lastLotto[0].round, lottoNumbers);

    return lottoNumbers;
  }
  @Post('save')
  @UseGuards(AuthGuard)
  saveMyLotto(@Body() saveMyLotto: SaveMyLottoDto, @GetUser() user: User) {
    return this.lottoUserService.saveMyLotto(saveMyLotto, user);
  }

  @Get('winner')
  async findByRound(@Query('round') round: number) {
    const winNumber = await this.lottoService.findByRound(round);
    return this.lottoLogService.findWinNumber(
      round,
      JSON.parse(winNumber.lotto_number),
    );
  }

  @Get('lastround')
  async getLastRound() {
    return await this.lottoService.getLastRound();
  }
}
