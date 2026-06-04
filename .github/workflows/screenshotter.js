const puppeteer = require("puppeteer");
const resolve = require("path").resolve;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"]});
  const page = await browser.newPage({ waitUntil: 'networkidle2' });

  const filePath = resolve("./index.html");
  await page.goto(`file://${filePath}`);
  await page.screenshot({ path: "./images/screenshot.png" });

  console.log("Captured screenshot");
  await browser.close();
})();
