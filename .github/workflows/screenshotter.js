// Small utility to take a screenshot of the website
// NOTE:
// The first custom argument is the path to the GitHub repo's root.
// The second custom argument is the website to screenshot.

// Imports
const puppeteer = require("puppeteer");
const resolve = require("path").resolve;
console.log("Imported");

// Args
const args     = process.argv.slice(2);
const repoPath = resolve(args[0]); // Must be an absolute path so puppeteer accepts it
const website  = args[1];

console.log("Got args");

// Main
(async () => {
  console.log("Starting");

  // Puppeteer setup
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage({ waitUntil: "networkidle2" });
  console.log("Setup Puppeteer");

  // Screenshot
  await page.goto(website);
  await page.screenshot({ path: `${repoPath}/images/screenshot.png` });
  console.log("Took screenshot");

  await browser.close();
  console.log("Ending");
})().then((result) => {
  console.log("Screenshot succeeded:", result);
  process.exit(0);
}).catch((error) => {
  console.error("Screenshot failed:", error);
  process.exit(1);
});
