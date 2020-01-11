methods = {
  craigScrape: async function getResults(City, Item, MinPrice, MaxPrice) {
    const puppeteer = require("puppeteer");
    const db = require("../models");
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: null
    });

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
        properties.price.trim("$");
        const imageEl = row.querySelector(".swipe [data-index='0'] img");
        properties.imageUrl = imageEl ? imageEl.src : "";
        return properties;
      });
    });
    // console.log(results[0]);
    // console.log(url);
    browser.close();

    db.Results.bulkCreate(results)
      .then(() => {
        // Notice: There are no arguments here, as of right now you'll have to...
        return db.Results.findAll();
      })
      .then(users => {
        console.log(users); // ... in order to get the array of user objects
      });

    // console.log(results);
    // console.log(results[4]);
    return results;
  }
};

exports.data = methods;
