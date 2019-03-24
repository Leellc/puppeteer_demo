const puppeteer = require('puppeteer')

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  // const page = (await browser.pages())[0];
  await page.goto('https://www.qunar.com/');
  await browser.close();
  console.log('browser closed');
})();