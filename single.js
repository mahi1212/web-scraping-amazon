const puppeteer = require('puppeteer');

// async function main() {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.google.com');
//   await page.screenshot({path: 'google.png'});
//   await browser.close();
// }

async function scrapeProduct(url) {
    // lunch the browser
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imgUrl = await src.jsonValue()

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue()

    const [el3] = await page.$x('//*[@id="availability"]/span');
    const txt2 = await el3.getProperty('textContent');
    const available = await txt2.jsonValue()
    console.log({ imgUrl, title, available});//*[@id="landingImage"]



    browser.close();
}

scrapeProduct('https://www.amazon.com/2022-Apple-MacBook-Laptop-chip/dp/B0B3C7MJX3/ref=sr_1_1?keywords=apple+mackbook%5C&qid=1675681752&sr=8-1');