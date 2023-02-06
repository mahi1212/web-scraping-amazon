// const puppeteer = require('puppeteer');

// // async function main() {
// //   const browser = await puppeteer.launch();
// //   const page = await browser.newPage();
// //   await page.goto('https://www.google.com');
// //   await page.screenshot({path: 'google.png'});
// //   await browser.close();
// // }

// async function scrapeProduct(url) {
//     // lunch the browser
//     const browser = await puppeteer.launch()
//     const page = await browser.newPage()
//     await page.goto(url)

//     // const [el] = await page.$x('//*[@id="landingImage"]');
//     // const src = await el.getProperty('src');
//     // const imgUrl = await src.jsonValue()

//     // const [el2] = await page.$x('//*[@id="productTitle"]');
//     // const txt = await el2.getProperty('textContent');
//     // const title = await txt.jsonValue()

//     // const [el3] = await page.$x('//*[@id="availability"]/span');
//     // const txt2 = await el3.getProperty('textContent');
//     // const available = await txt2.jsonValue()
//     // console.log({ imgUrl, title, available});//*[@id="landingImage"] 



//     browser.close();
// }

// // scrapeProduct('https://www.amazon.com/2022-Apple-MacBook-Laptop-chip/dp/B0B3C7MJX3/ref=sr_1_1?keywords=apple+mackbook%5C&qid=1675681752&sr=8-1');

const puppeteer = require('puppeteer');

async function scrapeProducts(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const products = await page.$$('.s-result-item');
  products.length = 10;
  for (const product of products) {
    const titleElement = await product.$('.a-size-medium');
    const priceElement = await product.$('.a-price-whole');
    const nameElement = await product.$('.a-color-base');
    const imageElement = await product.$('.s-image');

    if (titleElement) {
      const title = await titleElement.getProperty('textContent');
      const titleValue = await title.jsonValue();
      console.log(`Title: ${titleValue}`);
    }
    if (nameElement) {
      const name = await nameElement.getProperty('textContent');
      const nameValue = await name.jsonValue();
      console.log(`Name: ${nameValue}`);
    }
    if (priceElement) {
      const price = await priceElement.getProperty('textContent');
      const priceValue = await price.jsonValue();
      console.log(`Price: ${priceValue}`);
    }
    if (imageElement) {
      const image = await imageElement.getProperty('src');
      const imageValue = await image.jsonValue();
      console.log(`Image: ${imageValue}`);
    }
    console.log('---------------------');
  }

  await browser.close();
}

scrapeProducts('https://www.amazon.com/s?k=car+toy&crid=1TK2REW711M02&sprefix=car+to%2Caps%2C630&ref=nb_sb_noss_2');