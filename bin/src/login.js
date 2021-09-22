const fs = require('fs');
const { EOL } = require('os');
const { By, until } = require('selenium-webdriver');

async function login(driver) {
  const [username, company, password] = fs.readFileSync('../userinfo').toString().split(EOL);
  if (username && company && password) {
    if (username.startsWith('<')) {
      await (await driver.findElement(By.id('username'))).sendKeys('Please fill out the file "userinfo" in the iCount-bypass folder');
      return;
    }
    await driver.wait(until.elementLocated(By.id('username')));

    await (await driver.findElement(By.id('username'))).sendKeys(username);
    await (await driver.findElement(By.id('compidentifier'))).sendKeys(company);
    await (await driver.findElement(By.id('password'))).sendKeys(password);

    await (await driver.findElement(By.id('login-button'))).click();
  }
}
exports.login = login;
