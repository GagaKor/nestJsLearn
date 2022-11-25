"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getThisWeekLotto = void 0;
const XLSX = require("xlsx");
const fs = require("fs");
const path_1 = require("path");
const common_1 = require("@nestjs/common");
const path = require("path");
const downloadRoot = process.env.NODE_ENV === 'prod'
    ? path.join(__dirname, '..', 'static')
    : path.join(__dirname, '..', '..', 'static');
const logger = new common_1.Logger();
const getThisWeekLotto = async (last) => {
    const data = fs.readFileSync((0, path_1.join)(downloadRoot, 'excel.xls'));
    const workbook = XLSX.read(data);
    const sheet = workbook.SheetNames;
    const list = workbook.Sheets[sheet[1]];
    const result = [];
    let lastgame = Number(list['!ref'].slice(list['!ref'].indexOf('T') + 1));
    if (last === lastgame) {
        logger.log('There is no data to register.');
        return;
    }
    else {
        lastgame -= last;
    }
    for (let i = lastgame; i > 2; i--) {
        const numArr = [
            list[`N${i}`].v,
            list[`O${i}`].v,
            list[`P${i}`].v,
            list[`Q${i}`].v,
            list[`R${i}`].v,
            list[`S${i}`].v,
        ];
        const round = list[`B${i}`].v;
        const data = {
            round,
            lotto: numArr,
        };
        result.push(data);
    }
    return result;
};
exports.getThisWeekLotto = getThisWeekLotto;
//# sourceMappingURL=lotto.js.map