import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as cheerio from 'cheerio';
import { Lottos } from 'src/lotto/dto/lottos.dto';

const downloadRoot =
  process.env.NODE_ENV === 'prod'
    ? path.join(__dirname, '..', 'static')
    : path.join(__dirname, '..', '..', 'static');

const config =
  process.env.NODE_ENV === 'prod'
    ? {
        ignoreHTTPSErrors: true,
        headless: false,
        devtools: true,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: [
          '--no-sandbox',
          `--ignore-certificate-errors`,
          '--disable-setuid-sandbox',
        ],
        // executablePath: '/usr/bin/chromium-browser',
      }
    : {
        headless: false,
        ignoreDefaultArgs: ['--enable-automation'],
        args: ['--no-sandbox'],
        executablePath:
          'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      };

if (!fs.existsSync(downloadRoot)) {
  fs.mkdirSync(downloadRoot);
}

const wait = (ms) => {
  return new Promise((res) => setTimeout(res, ms));
};

export const downloadExcel = async () => {
  const thisWeekLotto: Lottos[] = [];

  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();
  await page.goto('https://dhlottery.co.kr/gameResult.do?method=byWin', {
    waitUntil: 'networkidle2',
  });

  try {
    const optionSelect = '#drwNoStart';
    await page.click(optionSelect, { delay: 500 });
    await page.keyboard.press('End', { delay: 500 });
    await page.keyboard.press('Enter', { delay: 500 });
    const client = await page.target().createCDPSession();
    await client.send('Page.setDownloadBehavior', {
      behavior: 'allow',
      downloadPath: path.join(downloadRoot),
    });

    const downBtn = '#exelBtn';
    await page.click(downBtn, { delay: 1000 });

    const checker = setInterval(async () => {
      if (fileCheck()) {
        clearInterval(checker);
        await page.close();
      }
    }, 1000);
  } catch (err) {
    const content = await page.content();

    const $ = cheerio.load(content);

    const lists = $(
      '#article > div:nth-child(2) > div > div.win_result > div > div.num.win > p > span.ball_645.lrg',
    );
    const lottoNumber: number[] = [];
    lists.each((index, list) => {
      const num = $(list).text();
      lottoNumber.push(Number(num));
    });

    const roundHtml = $(
      '#article > div:nth-child(2) > div > div.win_result > h4',
    );
    const regex = /[^0-9]/g;
    const round = Number(roundHtml.text().replace(regex, ''));

    const lotto: Lottos = {
      round,
      lotto: lottoNumber,
    };

    thisWeekLotto.push(lotto);
  }

  return thisWeekLotto;
};
export const fileCheck = () => {
  const files = fs.readdirSync(path.join(downloadRoot));
  return files.includes('excel.xls');
};

export const remove = () => {
  try {
    fs.unlinkSync(path.join(downloadRoot, 'excel.xls'));

    return true;
  } catch (err) {
    return false;
  }
};

export const purchaseLottoSite = async (data) => {
  const browser = await puppeteer.launch(config);
  const page = await browser.newPage();
  await page.goto('https://dhlottery.co.kr/user.do?method=login&returnUrl=', {
    waitUntil: 'networkidle2',
  });

  await page.type('input[name=userId]', data.id);
  // page.waitForNavigation();
  await page.type('input[name=password]', data.password);

  await page.keyboard.press('Enter', { delay: 1000 });

  const page2 = await browser.newPage();
  await page2.goto('https://ol.dhlottery.co.kr/olotto/game/game645.do');
  for (const lotto of data.lotttos) {
    for (const num of lotto) {
      const checkBox = await page2.$(`input[id=check645num${num}]`);

      await checkBox.evaluate((b) => b.click());
    }
    const confrim = await page2.$('input[id="btnSelectNum"]');
    await confrim.evaluate((b) => b.click());
  }

  await wait(1000);

  const buy = await page2.$('input[id="btnBuy"]');
  await buy.evaluate((b) => b.click());

  const buyConfrim = await page2.$(
    '#popupLayerConfirm > div > div.btns > input:nth-child(1)',
  );
  await buyConfrim.evaluate((b) => b.click());

  await wait(1000);

  await page2.close();
  await page.close();
  await browser.close();
};
