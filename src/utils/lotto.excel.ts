import * as fs from 'fs';
import * as puppeteer from 'puppeteer';
import * as path from 'path';

const downloadRoot =
  process.env.NODE_ENV === 'prod'
    ? path.join(__dirname, '..', 'static')
    : path.join(__dirname, '..', '..', 'static');

export const downloadExcel = async () => {
  const config =
    process.env.NODE_ENV === 'prod'
      ? {
          ignoreDefaultArgs: ['--enable-automation'],
          args: ['--no-sandbox'],
          executablePath: '/usr/bin/chromium-browser',
        }
      : {
          headless: true,
          ignoreDefaultArgs: ['--enable-automation'],
          args: ['--no-sandbox'],
          executablePath:
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        };
  const browser = await puppeteer.launch(config);

  const page = await browser.newPage();

  await page.goto('https://dhlottery.co.kr/gameResult.do?method=byWin', {
    waitUntil: 'networkidle2',
  });
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
