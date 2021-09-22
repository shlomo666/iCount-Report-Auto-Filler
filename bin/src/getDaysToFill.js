const { By } = require('selenium-webdriver');
const { getAllDays, reverseDate } = require('./dateManipulations');
const { firstDayOfTheMonth } = require('./firstDayOfTheMonth');

async function getDaysToFill(driver) {
  const html = await (await driver.findElement(By.id('exportable'))).getAttribute('innerText');

  const days = getAllDays(firstDayOfTheMonth)
    .filter((day) => new Date(day) < Date.now()) // exclude future days
    .filter((day) => !html.includes(reverseDate(day))); // exclude already filled days
  return days;
}
exports.getDaysToFill = getDaysToFill;
