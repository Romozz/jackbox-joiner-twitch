console.log('Сделал Romoz')
const tmi = require('tmi.js');
const puppeteer = require('puppeteer');
const fs = require('fs')
const wsChromeEndpointurl = fs.readFileSync('chrome.txt', 'utf-8');
const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true
  },
  channels: [ 'rom0z' ]
});
client.connect();
client.on('message', async(channel, tags, message, self) => {
    if(tags['display-name'].toLowerCase() == 'rom0z'){
  if(JSON.stringify(message.split(' ')) == JSON.stringify(message.split(' ').map(code => code.toUpperCase())), message.split(' ').map(code => code.length)[0] == 4){
    var code = message.split(' ')[0]
    const browser = await puppeteer.connect({ browserWSEndpoint: wsChromeEndpointurl, defaultViewport: null,});
    const page = await browser.newPage();
    await page.goto('https://jackbox.fun/', {
      waitUntil: 'networkidle2',
    });
    await page.evaluate((code)=>{
        fetch(`https://ecast.jackboxgames.com/api/v2/rooms/${code}`, {
  "headers": {
    "accept": "*/*",
    "accept-language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6",
    "sec-ch-ua": "\"Chromium\";v=\"112\", \"Google Chrome\";v=\"112\", \"Not:A-Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://jackbox.fun/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
    })
    await page.focus('#roomcode')
await page.keyboard.type(`${code}`)
try{
  setTimeout(()=>{
     page.click('#button-join');
    }, 500)
}catch (err) {}
  }
    }
});