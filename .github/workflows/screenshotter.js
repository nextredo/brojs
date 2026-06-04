// Imports
const puppeteer = require("puppeteer");
const resolve = require("path").resolve;

// NOTE:
// The first custom argument should be the path to the GitHub repo's root.
const args = process.argv.slice(2);
const repoPath = args[0];
const absoluteRepoPath = resolve(repoPath);

// Main
(async () => {
  // Puppeteer setup
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"]});
  const page = await browser.newPage({ waitUntil: "networkidle2" });

  // Screenshot
  console.log(`Absolute repo path: ${absoluteRepoPath}`);
  await page.goto(`file://${absoluteRepoPath}/index.html`);
  await page.screenshot({ path: `${absoluteRepoPath}/images/screenshot.png` });

  await browser.close();
})().then((result) => {
  console.log("Screenshot succeeded:", result);
  process.exit(0);
}).catch((error) => {
  console.error("Screenshot failed:", error);
  process.exit(1);
});
