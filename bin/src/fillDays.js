const { By, Key, until } = require('selenium-webdriver');
const { tryIt } = require('./tryIt');

async function fillDays(days, driver) {
  for (const day of days) {
    console.log(7);
    await addNewDayRow(driver);
    await fillDayRow(driver, day);
  }
}

async function addNewDayRow(driver) {
  await tryIt(async () => {
    try {
      console.log(8);
      await waitUntilDaysFormIsEditable(driver);
      console.log(9);
      await addNewDay(driver);
      console.log(10);
    } catch (err) {
      await driver.sleep(1000);
      throw err;
    }
  });
}

async function waitUntilDaysFormIsEditable(driver) {
  await driver.wait(until.elementLocated(By.id('btn_add_manual')), 3000);
}

async function addNewDay(driver) {
  await (await driver.findElement(By.id('btn_add_manual'))).click();
}

async function fillDayRow(driver, day) {
  await tryIt(async () => {
    console.log(11);
    await driver.sleep(200);
    console.log(12);
    await driver.wait(until.elementLocated(By.id('manual_in_time')), 3000);
    await (await driver.findElement(By.id('manual_in_time'))).sendKeys(Key.chord(Key.COMMAND, 'a'), '9:00');
    console.log(13);
    await (await driver.findElement(By.id('manual_out_time'))).sendKeys(Key.chord(Key.COMMAND, 'a'), '18:00');
    console.log(14);
    await (await driver.findElement(By.id('manual_in_date'))).sendKeys(Key.chord(Key.COMMAND, 'a'), day);
    console.log(15);
    await (await driver.findElement(By.id('manual_out_date'))).sendKeys(Key.chord(Key.COMMAND, 'a'), day);
    console.log(16);
    await driver.sleep(200);
    console.log(17);
    await (await driver.findElement(By.id('btn_add_manual_go'))).click();
    console.log(18);
  });
}

exports.waitUntilDaysFormIsEditable = waitUntilDaysFormIsEditable;
exports.fillDays = fillDays;
