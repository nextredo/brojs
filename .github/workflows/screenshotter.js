// Small utility to take a screenshot of the website
// NOTE:
// - First user arg is the screenshot output directory path.
// - Second user arg is the website to screenshot.

// Imports
const puppeteer = require("puppeteer");
const path = require("path");
console.log("Imported");

// Args
const args    = process.argv.slice(2);
const outPath = path.resolve(args[0]); // Convert to absolute path
const website = args[1];
console.log("Got args");

// TODO make this actually error out properly
// It doesn't seem to return a nonzero exit code when
// something fails within puppeteer

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

  // Page setup
  await page.setViewport({ width: 1920, height: 1080 });
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }]);
  await page.goto(website);
  console.log("Setup page");

  // Output filepaths
  // Must be absolute paths so puppeteer accepts them
  const lightOutPath = path.join(outPath, "/sc-light.png")
  const darkOutPath  = path.join(outPath, "/sc-dark.png")

  // Light mode
  // Screenshot
  console.log(`Taking light screenshot: ${lightOutPath}`);
  await page.screenshot({ path: lightOutPath });

  // Swap to dark mode
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "dark" }]);

  // Dark mode
  // Screenshot
  console.log(`Taking dark screenshot: ${darkOutPath}`);
  await page.screenshot({ path: darkOutPath });

  await browser.close();
  console.log("Ending");
})().then((result) => {
  console.log("Succeeded:", result);
  process.exit(0);
}).catch((error) => {
  console.error("Failed:", error);
  process.exit(1);
});
