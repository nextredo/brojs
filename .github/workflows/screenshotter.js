// Imports
const puppeteer = require("puppeteer");
const resolve = require("path").resolve;

// NOTE:
// The first custom argument is the path to the GitHub repo's root.
// The second custom argument is the website to screenshot.
const args = process.argv.slice(2);

// Make it an absolute path, so puppeteer accepts it
const repoPath = resolve(args[0]);
const website = args[1];

// Main
(async () => {
  // Puppeteer setup
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"]});
  const page = await browser.newPage({ waitUntil: "networkidle2" });

  // Screenshot
  await page.goto(website);
  await page.screenshot({ path: `${repoPath}/images/screenshot.png` });

  await browser.close();
})().then((result) => {
  console.log("Screenshot succeeded:", result);
  process.exit(0);
}).catch((error) => {
  console.error("Screenshot failed:", error);
  process.exit(1);
});
