const { chromium } = require('playwright');

describe('basic test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch();
  });
  afterAll(async () => {
    await browser.close();
  });
  beforeEach(async () => {
    page = await browser.newPage();
  });
  afterEach(async () => {
    await page.close();
  });

  it('should work', async () => {
    await page.goto('http://localhost:3000');
    expect(await page.title()).toBe('Sign In');
  });
});

export default {};
