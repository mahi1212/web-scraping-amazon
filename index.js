const express = require('express');
const app = express();


console.log('hello world')
let array = [];
async function searchProduct(url) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const products = await page.$$('.s-result-item');
  for (const product of products) {
    const titleElement = await product.$('.a-size-medium');
    const priceElement = await product.$('.a-price-whole');
    const fractionElement = await product.$('.a-price-fraction');
    const nameElement = await product.$('.a-color-base');
    const imageElement = await product.$('.s-image');

    if (nameElement && priceElement && imageElement) {
      const name = await nameElement.getProperty('textContent');
      const nameValue = await name.jsonValue();
      const price = await priceElement.getProperty('textContent');
      const priceValue = await price.jsonValue();
      const fraction = await fractionElement.getProperty('textContent');
      const fractionValue = await fraction.jsonValue();
      const image = await imageElement.getProperty('src');
      const imageValue = await image.jsonValue();
      array.push({ nameValue, priceValue, fractionValue, imageValue });
      if (array.length === 10) {
        break;
      }
    } else if (titleElement && priceElement && imageElement) {
      const title = await titleElement.getProperty('textContent');
      const titleValue = await title.jsonValue();
      const price = await priceElement.getProperty('textContent');
      const priceValue = await price.jsonValue();
      const fraction = await fractionElement.getProperty('textContent');
      const fractionValue = await fraction.jsonValue();
      const image = await imageElement.getProperty('src');
      const imageValue = await image.jsonValue();
      array.push({ titleValue, priceValue, fractionValue, imageValue });
      if (array.length === 10) {
        break;
      }

    }
  }
  console.log(array);
  await browser.close();
}


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
  let html = '<html><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Search Page</title><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></head><body class="container d-flex justify-content-center align-items-center"><div class="d-flex justify-content-center align-items-center row">';
  array.forEach((item) => {
    html += `
    <div class="card col-3" style="width: 18rem; height: 470px">
        <img src="${item.imageValue}" class="card-img-top" style="height: 10rem;" alt="...">
        <div class="card-body">
            <h5 class="card-text">Product Name: ${item.nameValue}</h5>
            <p class="card-text">Price: ${item.priceValue}${item.fractionValue}$</p>
            <a href="#" class="btn btn-primary">Add to cart</a>
        </div>
    </div>
    `;
  });
  html += '</div></body></html>';
  res.send(html);
});

searchProduct('https://www.amazon.com/s?k=car+toy&sprefix=%2Caps%2C778&ref=nb_sb_ss_recent_5_0_recent');