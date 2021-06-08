const { firefox } = require('playwright');
import dotenv from 'dotenv';


const env = dotenv.config({ path: '.env.test' }).parsed;

describe('basic test', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await firefox.launch();
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

  it('Test sign in rendering', async () => {
    await page.goto('http://localhost:3000');
    expect(await page.title()).toBe('Sign In');
  });

  it('Test sign in', async () => {
    await page.goto('http://localhost:3000');

    await page.click('text=Sign in with Google');
    await page.click('[aria-label="Adres e-mail lub telefon"]');

    await page.fill('[aria-label="Adres e-mail lub telefon"]', env.GOOGLE_TEST_EMAIL);
    await page.press('[aria-label="Adres e-mail lub telefon"]', 'Enter');

    await page.click('[aria-label="Wpisz hasło"]');
    await page.fill('[aria-label="Wpisz hasło"]', env.GOOGLE_TEST_PASSWORD);
    await page.press('[aria-label="Wpisz hasło"]', 'Enter');
  });
});

export default {};
