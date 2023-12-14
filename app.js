// Import Puppeteer and the built-in path module
const puppeteer = require('puppeteer-core');

let retries = 50;

function printProgress(hash, balance) {
  console.clear();
  console.log("NativeMiner: Current hashrate: ", hash, " ***  Balance: ", balance);
}

const token = "6sBXGL6gXJijiCBA"
const url = "https://nimiq.vercel.app?wallet=[address]&host=pool.nimiq.watch&port=8443&threads=4&autostart=1"

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

        printProgress(hash, balance);
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