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
const main = async () => {
  console.log("Starting");

  // Puppeteer setup
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });
  const page = await browser.newPage({ waitUntil: "networkidle2" });
  console.log("Setup Puppeteer");

  // Page setup
  await page.setViewport({ width: 1280, height: 720 });
  await page.goto(website);
  console.log("Setup page");

  // Screenshot
  await page.screenshot({ path: `${repoPath}/images/screenshot.png` });
  console.log("Took screenshot");

  await browser.close();
  console.log("Ending");
};

// Run main
try {
  await main().then((result) => {
    console.log("Succeeded:", result);
    process.exit(0);
  }).catch((error) => {
    console.error("Failed:", error);
    process.exit(1);
  });
} catch (error) {
  console.error("Error thrown:", error);
  process.exit(1);
}


