import * as XLSX from 'xlsx';
import * as fs from 'fs';
import { join } from 'path';
import { Lottos } from 'src/lotto/dto/lottos.dto';
import { Logger } from '@nestjs/common';
import * as path from 'path';

const downloadRoot =
  process.env.NODE_ENV === 'prod'
    ? path.join(__dirname, '..', 'static')
    : path.join(__dirname, '..', '..', 'static');

const logger = new Logger();
export const getThisWeekLotto = async (last: number) => {
  const data = fs.readFileSync(join(downloadRoot, 'excel.xls'));
  const workbook = XLSX.read(data);
  const sheet = workbook.SheetNames;
  const list = workbook.Sheets[sheet[1]];
  const result: Lottos[] = [];
  let lastgame = Number(list['!ref'].slice(list['!ref'].indexOf('T') + 1));
  if (last === lastgame) {
    logger.log('There is no data to register.');
    return;
  } else {
    lastgame -= last;
  }

  for (let i = lastgame; i > 2; i--) {
    const numArr: number[] = [
      list[`N${i}`].v,
      list[`O${i}`].v,
      list[`P${i}`].v,
      list[`Q${i}`].v,
      list[`R${i}`].v,
      list[`S${i}`].v,
    ];
    const round: number = list[`B${i}`].v;
    const data: Lottos = {
      round,
      lotto: numArr,
    };
    result.push(data);
  }
  return result;
};
