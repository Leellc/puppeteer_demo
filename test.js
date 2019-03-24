const puppeteer = require('puppeteer')
let device = require('puppeteer/DeviceDescriptors')

puppeteer.launch({
  headless: false,
  // slowMo: 150,
  devtools: true
}).then(async browser => {
  const page = (await browser.pages())[0];
  page.on('response', async response => {
    if (response.request().resourceType() === 'xhr') {
      console.log(response.url());
      if (response.url().includes('wbdflightlist')) {
        console.log('找到url了');
        const res = await response.json()
        console.log(res);
        await browser.close();
        console.log('browser closed');
      }
    }
  })
  await page.goto('https://flight.qunar.com/site/oneway_list.htm?searchDepartureAirport=%E5%8C%97%E4%BA%AC&searchArrivalAirport=%E6%88%90%E9%83%BD&searchDepartureTime=2019-03-27&searchArrivalTime=2019-03-29&nextNDays=0&startSearch=true&fromCode=BJS&toCode=CTU&from=qunarindex&lowestPrice=null',{
    // waitUntil:'networkidle2'
  })
  await page.reload()
  /* const response = await page.waitForResponse(response => response.url().includes('wbdflightlist'))
  const res = await response.json()
  console.log(res); */
  // await page.waitForNavigation()
  // await page.waitFor(1500)

})
  
