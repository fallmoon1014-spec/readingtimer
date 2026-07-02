const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));
  page.on('dialog', async dialog => {
    console.log('Dialog opened:', dialog.message());
    await dialog.accept();
  });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(1000);
  
  console.log('Clicking start on first student...');
  await page.locator('.toggle-btn').first().click();
  
  await page.waitForTimeout(2000);
  
  console.log('Clicking reset all...');
  await page.locator('.reset-btn').click();
  
  await page.waitForTimeout(1000);
  
  const time = await page.locator('.time-display').first().innerText();
  console.log('Time after reset:', time);
  
  console.log('Done.');
  await browser.close();
})();
