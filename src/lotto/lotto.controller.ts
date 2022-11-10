import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { LottoService } from "src/lotto/lotto.service";
import { CreateLottoDto } from "src/lotto/dto/create-lotto.dto";
import { Lottos } from "src/lotto/dto/lottos.dto";
import { AuthGuard } from "src/auth/security/auth.guard";
import { SaveMyLottoDto } from "src/lotto/dto/Save-MyLottoDto";
import { GetUser } from "src/decorator/get-user.decorator";
import { User } from "src/auth/entities/User.entity";
import { Lotto } from "src/lotto/entities/Lotto.entity";

@Controller("lotto")
export class LottoController {
  constructor(private readonly lottoService: LottoService) {}
  @Get()
  lottoFindByUser(@GetUser() user: User): Promise<Lotto[]> {
    return this.lottoService.lottoFindByUser(user);
  }

  @Post()
  createLotto(@Body() createLottoDto: CreateLottoDto): Lottos[] {
    return this.lottoService.createLotto(createLottoDto);
  }
  @Post("save")
  @UseGuards(AuthGuard)
  saveMyLotto(@Body() saveMyLotto: SaveMyLottoDto, @GetUser() user: User) {
    return this.lottoService.saveMyLotto(saveMyLotto, user);
  }
}
