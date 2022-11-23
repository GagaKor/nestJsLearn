import * as fs from "fs";
import * as puppeteer from "puppeteer-core";
import { join } from "path";

export const downloadExcel = async () => {
  try {
    // if (!fs.existsSync("C://lotto")) {
    //   fs.mkdirSync("C://lotto");
    // }
    const config = process.env.NODE_ENV === 'prod'?{
      ignoreDefaultArgs: ["--enable-automation"],
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
     } : {
      headless: true,
      ignoreDefaultArgs: ["--enable-automation"],
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
     }
    const browser = await puppeteer.launch(config);
    
    const page = await browser.newPage();

    await page.goto("https://dhlottery.co.kr/gameResult.do?method=byWin", {
      waitUntil: "networkidle2",
    });

    const optionSelect = "#drwNoStart";
    await page.click(optionSelect, { delay: 500 });
    await page.keyboard.press("End", { delay: 500 });
    await page.keyboard.press("Enter", { delay: 500 });
    const client = await page.target().createCDPSession();
    await client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: join(__dirname, "..", "..", "static"),
    });
    // await page._client.send("Page.setDownloadBehavior", {
    //   behavior: "allow",
    //   downloadPath: path.resolve("/", "lotto"),
    // });
    const downBtn = "#exelBtn";
    await page.click(downBtn, { delay: 500 });

    let timeout = 1000;
    try {
      const interval = setInterval(() => {
        fs.readdir(join(__dirname, "..", "..", "static"), async (err, files) => {
          if (files && files.includes("excel.xls")) {
            clearInterval(interval);
          } else {
            timeout = 1000;
          }
        });
      }, 500);
      await page.waitForTimeout(timeout);
      await browser.close();
    } catch (err) {
      console.log(err);
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const remove = () => {
  try {
    fs.unlinkSync(join(__dirname, "..", "..", "static", "excel.xls"));
    return true;
  } catch (err) {
    return false;
  }
};
