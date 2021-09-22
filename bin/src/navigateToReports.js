const { By, until } = require('selenium-webdriver');

async function navigateToReports(driver) {
  await driver.wait(until.elementLocated(By.id('activities_log_section')));
  await driver.get('https://app.icount.co.il/presence/report.php');
}
exports.navigateToReports = navigateToReports;
