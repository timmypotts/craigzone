async function getResults(City, Item, MinPrice, MaxPrice) {
  const puppeteer = require("puppeteer");
  const db = require("../models");
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });

  var city = City;
  var item = Item;
  var minPrice = MinPrice;
  var maxPrice = MaxPrice;

  const page = await browser.newPage();

  const url =
    "https://" +
    city +
    ".craigslist.org/search/sss?query=" +
    item +
    "&sort=rel&min_price=" +
    minPrice +
    "&max_price=" +
    maxPrice;

  await page.goto(url);

  await page.waitFor(".result-row");

  const results = await page.$$eval(".result-row", rows => {
    return rows.map(row => {
      const properties = {};
      const titleEl = row.querySelector(".result-title");
      properties.title = titleEl.innerText;
      properties.url = titleEl.getAttribute("href");
      const priceEl = row.querySelector(".result-price");
      properties.price = priceEl ? priceEl.innerText : "";
      properties.price = properties.price.replace("$", "");
      const imageEl = row.querySelector(".swipe [data-index='0'] img");
      properties.image = imageEl ? imageEl.src : "";
      return properties;
    });
  });
  console.log(results[0]);
  // console.log(url);
  browser.close();

  // for (var i = 0; i < results.length; i++) {
  //   db.Results.create({
  //     title: results[i].title,
  //     url: results[i].url,
  //     price: results[i].price,
  //     image: results[i].image
  //   }).then(output => {
  //     console.log(output);
  //   });
  // }
  return results;
}

getResults("denver", "pool table", 0, 5000);
// exports.data = methods;
