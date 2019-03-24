const puppeteer = require('puppeteer')
const fs = require('fs')

console.log('puppeteer is launching!');

  (async () => {
    const browser = await puppeteer.launch({
      headless: false,
      // slowMo: 100
    });
    //获取第一个页面标签
    const page = (await browser.pages())[0];
    await page.goto('https://www.qunar.com/');
    await page.screenshot({ path: __dirname+'/qunarHome.png' });
    //点击'出发'输入框
    await page.click('input[name=fromCity]')
    console.log('点击出发输入框');
    await page.waitFor(1500)
    const selectorCTU = '.js-hotcitylist[data-code="CTU"]'
    await page.waitForSelector(selectorCTU)
    await page.click(selectorCTU)
    console.log('选择成都');
    
    //点击'到达'输入框
    await page.click('input[name=toCity]')
    console.log('点击出发输入框');
    await page.waitFor(1500)
    const selectorBJS = await page.$$('.js-hotcitylist[data-code="BJS"]')
    //文档中包括两个 '北京'，需要点击第二个
    await selectorBJS[1].click()
    console.log('选择北京');

    
    //点击'立即搜索'
    await page.click('.button-search')
    await page.waitForNavigation({
      // waitUntil:'domcontentloaded'
    })
    /* await Promise.all([
      page.waitForNavigation(), // The promise resolves after navigation has finished
      page.click('.button-search'), // 点击该链接将间接导致导航(跳转)
    ]); */
    //跳转到下一个页面之前就应该对页面添加监听
    //否则可能响应已经成功了，才开始监听那样会出错的
    page.on('requestfinished', async request => {
      if (request.resourceType == 'xhr') {
        console.log(request.url());
        if (request.url().includes('wbdflightlist')) {
          // await page.screenshot({ path:'/flightInfo.json'})
          console.log('找到url了');
          const res = request.response()
          console.log(res);
          /* const res = await response.json()
          fs.writeFileSync(__dirname + '/flightInfo.json', JSON.stringify(res))
          console.log('已写入/flightInfo.json');
          console.log('browser is closed');
          await browser.close() */
        }
      }
    })
    console.log('点击立即搜索');
    //等待页面跳转
    console.log('loading');
  })();