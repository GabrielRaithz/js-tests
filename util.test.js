const puppeteer = require('puppeteer');
const { generateText } = require('./util');
const { checkAndGenerate } = require('./util');

test('should output name and age', () => {
    const text = generateText('Gabriel', 22);
    expect(text).toBe('Gabriel (22 years old)');
});

test('should generate a valid text output', () => {
    const text = checkAndGenerate('Gabriel', 22);
    expect(text).toBe('Gabriel (22 years old)');
})

test('should click around', async () => {
    const browser = await puppeteer.launch({
        //headless: false,
        //slowMo: 80,
        //args: ['--window-size=1920,1080']
    });

    const page = await browser.newPage();
    await page.goto(
        'file:///home/gabriel/Documents/gitMine/js-testing-introduction/index.html'
    );
    await page.click('input#name');
    await page.type('input#name', 'Anna');
    await page.click('input#age');
    await page.type('input#age', '25');
    await page.click('#btnAddUser');
    const finalText = await page.$eval('.user-item', el => el.textContent);
    expect(finalText).toBe('Anna (25 years old)');
},10000) 