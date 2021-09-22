const shellPath = require('shell-path');
process.env.PATH = shellPath.sync();

const { Builder } = require('selenium-webdriver');
const { login } = require('./login');
const { navigateToReports } = require('./navigateToReports');
const { showReportsSinceLastMonth } = require('./showReportsSinceLastMonth');
const { fillDays } = require('./fillDays');
const { getDaysToFill } = require('./getDaysToFill');
const { showQuitDialog } = require('./showQuitDialog');

(async function () {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.manage().window().maximize();
    await driver.get('https://app.icount.co.il/login.php');

    await login(driver);
    await navigateToReports(driver);
    await showReportsSinceLastMonth(driver);
    const days = await getDaysToFill(driver);
    await fillDays(days, driver);

    const quit = await showQuitDialog(driver);
    if (quit) {
      await driver.quit();
    }
  } catch (err) {
    console.log(err);
    await driver.quit();
  }
})();
