"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.fileCheck = exports.downloadExcel = void 0;
const fs = require("fs");
const puppeteer = require("puppeteer");
const path = require("path");
const downloadRoot = process.env.NODE_ENV === 'prod'
    ? path.join(__dirname, '..', 'static')
    : path.join(__dirname, '..', '..', 'static');
const downloadExcel = async () => {
    const config = process.env.NODE_ENV === 'prod'
        ? {
            ignoreHTTPSErrors: true,
            headless: true,
            devtools: true,
            ignoreDefaultArgs: ['--disable-extensions'],
            args: [
                '--no-sandbox',
                `--ignore-certificate-errors`,
                '--disable-setuid-sandbox',
            ],
        }
        : {
            headless: true,
            ignoreDefaultArgs: ['--enable-automation'],
            args: ['--no-sandbox'],
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        };
    if (!fs.existsSync(downloadRoot)) {
        fs.mkdirSync(downloadRoot);
    }
    try {
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
            if ((0, exports.fileCheck)()) {
                clearInterval(checker);
                await page.close();
            }
        }, 1000);
    }
    catch (err) {
        console.log(err);
    }
};
exports.downloadExcel = downloadExcel;
const fileCheck = () => {
    const files = fs.readdirSync(path.join(downloadRoot));
    return files.includes('excel.xls');
};
exports.fileCheck = fileCheck;
const remove = () => {
    try {
        fs.unlinkSync(path.join(downloadRoot, 'excel.xls'));
        return true;
    }
    catch (err) {
        return false;
    }
};
exports.remove = remove;
//# sourceMappingURL=lotto.excel.js.map