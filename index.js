// import { QUOTE, QUOTE_TEXT, QUOTE_AUTHOR, QUOTE_TAG } from './constants';
// import QUOTE from './constants';

const QUOTE = 'body > div > div:nth-child(2) > div.col-md-8 > div:nth-child(1)';
const QUOTE_TEXT = 'body > div > div:nth-child(2) > div.col-md-8 > div:nth-child(1) > span.text';

const puppeteer = require('puppeteer');

const url = 'http://quotes.toscrape.com/';

let quotes = [];

(async () => {
    try {

        const browser = await puppeteer.launch({
            headless: false,
            args: [
                '--start-maximized'
            ]
        });
        const page = await browser.newPage();

        await page.goto(url);

        let quotesPerPage = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('.quote'), el => {
                return {
                    quote: el.querySelector('span.text').innerText,
                    author: el.querySelector('span small.author').innerText,
                    tags: Array.from(el.querySelectorAll('div.tags a.tag'), tag  => tag.innerText)
                }
            });
        });

       quotesPerPage.forEach(quote => quotes.push(quote));

        console.log(quotes);

    } catch (e) {
        console.log(e);
    }
})();