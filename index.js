// import { QUOTE, QUOTE_TEXT, QUOTE_AUTHOR, QUOTE_TAG } from './constants';
// import QUOTE from './constants';

const QUOTE = 'body > div > div:nth-child(2) > div.col-md-8 > div:nth-child(1)';

const puppeteer = require('puppeteer');

const url = 'http://quotes.toscrape.com/';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    await page.goto(url);

    const quotesPerPage = await page.$eval(QUOTE, el => { return {...el}});

    console.log(quotesPerPage);

    await browser.close();
   
})();