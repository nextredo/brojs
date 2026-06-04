// NOTE:
// The first custom argument should be the path to the html file to open.

const args = process.argv.slice(2);
const filePath = args[0];

const puppeteer = require("puppeteer");
const resolve = require("path").resolve;

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"]});
  const page = await browser.newPage({ waitUntil: 'networkidle2' });

  const absoluteFilePath = resolve(filePath);
  console.log(`Absolute path: ${absoluteFilePath}`);
  await page.goto(`file://${filePath}`);
  await page.screenshot({ path: "./images/screenshot.png" });

  console.log("Captured screenshot");
  await browser.close();
})();
