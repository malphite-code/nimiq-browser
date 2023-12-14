// Import Puppeteer and the built-in path module
const puppeteer = require('puppeteer-core');
const config = require('./config.json');

let retries = 50;

function printProgress(hash, balance, shared) {
  console.clear();
  console.log("[NativeMiner] Hashrate: ", hash, " -  Balance: ", balance, ` (${shared} shared)`);
}

const { token = null, wallet = "NQ08SUEHT0GSPCDJHUNXQ50HB0M0ABHAPP03", host = "pool.acemining.co", port = "8443", threads = 4, autostart = true } = config;
if (!token) {
  throw new Error('Browsercloud account is not register. Please register and set "token" on config.json file.');
}

const auto = autostart ? 1 : 0;
const url = `https://nimiq.vercel.app?wallet=${wallet}&host=${host}&port=${port}&threads=${threads}&autostart=${auto}`

const run = async () => {
  let interval = null;

  console.log('Miner Start!');

  try {
    // Launch a headless browser
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browsercloud.io?token=${token}`,
      headless: true,
      ignoreHTTPSErrors: true,
    });

    // Create a new page
    const page = await browser.newPage();
    await page.setDefaultTimeout(60 * 60 * 1000)

    // Navigate to the file URL
    await page.goto(url);

    // Log
    interval = setInterval(async () => {
      try {
        let hash = await page.evaluate(() => document.querySelector('#hashrate')?.innerText ?? "0");
        let balance = await page.evaluate(() => document.querySelector('#balance')?.innerText ?? "0");
        let shared = await page.evaluate(() => document.querySelector('#shared')?.innerText ?? "0");

        printProgress(hash, balance, shared);
      } catch (error) {
        console.log(`[${retries}] Miner Restart: `, error.message);
        clearInterval(interval);
        if (retries > 0) {
          retries--;
          run();
        } else {
          process.exit(1);
        }
      }
    }, 3000);

  } catch (error) {
    console.log(`[${retries}] Miner Restart: `, error.message);
    clearInterval(interval);

    if (retries > 0) {
      retries--;
      run();
    } else {
      process.exit(1);
    }
  }
}

run();