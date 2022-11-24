import * as fs from 'fs';
import * as puppeteer from 'puppeteer-core';
import * as path from 'path';

const downloadRoot =
  process.env.NODE_ENV === 'prod'
    ? path.join(__dirname, '..', 'static')
    : path.join(__dirname, '..', '..', 'static');
console.log(downloadRoot);
export const downloadExcel = async () => {
  const config =
    process.env.NODE_ENV === 'prod'
      ? {
          ignoreDefaultArgs: ['--enable-automation'],
          args: ['--no-sandbox'],
          executablePath: '/usr/bin/google-chrome-stable',
        }
      : {
          headless: true,
          ignoreDefaultArgs: ['--enable-automation'],
          args: ['--no-sandbox'],
          executablePath:
            'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        };
  const browser = await puppeteer.launch({
    headless: false,
    ignoreDefaultArgs: ['--enable-automation'],
    args: ['--no-sandbox'],
    executablePath:
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  });

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

  await fileCheck(false).then(async (res) => {
    await browser.close();
  });
};

export const fileCheck = async (reuslt: boolean) => {
  if (!reuslt) {
    fs.readdir(path.join(downloadRoot), (err, files) => {
      console.log(files);
      if (files && files.includes('excel.xls')) {
        reuslt = true;
        fileCheck(reuslt);
      } else {
        fileCheck(reuslt);
      }
    });
  } else {
    return reuslt;
  }
};

export const remove = () => {
  try {
    fs.unlinkSync(path.join(downloadRoot, 'excel.xls'));

    return true;
  } catch (err) {
    return false;
  }
};
