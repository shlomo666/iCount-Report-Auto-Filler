const { By, Key, until } = require('selenium-webdriver');
const { tryIt } = require('./tryIt');
const { startOfMonth, atPrevMonth, reverseDate } = require('./dateManipulations');
const { firstDayOfTheMonth } = require('./firstDayOfTheMonth');

async function showReportsSinceLastMonth(driver) {
  await driver.wait(until.elementLocated(By.id('show_rep')));
  await tryIt(async () => {
    await driver
      .findElement(By.xpath(`//input[@value='${reverseDate(startOfMonth())}']`))
      .sendKeys(Key.chord(Key.COMMAND, 'a'), reverseDate(atPrevMonth(firstDayOfTheMonth)), Key.ENTER);
    await driver.executeScript('!!document.activeElement ? document.activeElement.blur() : 0');
    await driver.executeScript("document.getElementById('ui-datepicker-div').style.display = 'none'; ");
    await driver.wait(until.elementLocated(By.id('show_rep'), 3000));
    await (await driver.findElement(By.id('show_rep'))).click();
    await driver.sleep(1000);
  });
}
exports.showReportsSinceLastMonth = showReportsSinceLastMonth;
