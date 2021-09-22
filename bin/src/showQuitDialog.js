const { WebDriver, until, By } = require('selenium-webdriver');
const { waitUntilDaysFormIsEditable } = require('./fillDays');

/** @param {WebDriver} driver */
async function showQuitDialog(driver) {
  await waitUntilReady(driver);

  const quit = await showDialog(driver);
  return quit;
}

/** @param {WebDriver} driver */
async function waitUntilReady(driver) {
  await waitUntilDaysFormIsEditable(driver);
  await driver.sleep(1000 * 3);
}

/** @param {WebDriver} driver */
async function showDialog(driver) {
  const resolveDriverScriptElementId = 'resolveDriverScriptElementId';
  await driver.executeScript(showDialogScript, resolveDriverScriptElementId);
  const quit = await waitForUserChoice(driver, resolveDriverScriptElementId);
  return quit;
}

/** @param {WebDriver} driver */
async function waitForUserChoice(driver, resolveDriverScriptElementId) {
  await driver.wait(until.elementLocated(By.id(resolveDriverScriptElementId)));
  const quit = await (await driver.findElement(By.id(resolveDriverScriptElementId))).getAttribute('value');
  await hideDialog(driver);

  console.log({ quit });
  return JSON.parse(quit);
}

/** @param {WebDriver} driver */
async function hideDialog(driver) {
  await driver.executeScript(() => {
    document.getElementById('quitDialog').style.display = 'none';
  });
}

function showDialogScript(resolveDriverScriptElementId) {
  window.resolveDriverScript = function (quit) {
    const input = document.createElement('input');
    input.id = resolveDriverScriptElementId;
    input.value = `${quit}`;
    document.body.appendChild(input); // Triggers waitForUserChoice
  };

  const el = document.querySelector('.idiv');
  el.innerHTML = `
      <div id="quitDialog" style="position: fixed; top: 0px; z-index: 9999; width: 100%; color: white; background-color: blue; display: flex; font-size: 3rem; padding: 10px; direction: ltr">
        <div style="margin: auto auto; display: flex; flex-direction: column; gap: 2px; align-items: center">
          <span>Bypass Finished!</span>
          <div style="display: flex; gap: 10px">
            <span onclick="resolveDriverScript(true);" style="background-color: blue; color: white; font-weight: bold; font-size: 1rem; cursor: pointer; border: 5px ridge blue">Quit</span>
            <span onclick="resolveDriverScript(false);" style="background-color: gray; color: yellow; font-weight: bold; font-size: 1rem; cursor: pointer; border: 5px ridge gray">Need to make some manual changes</span>
          </div>
        </div>
      </div>
      ${el.innerHTML}
      `;

  document.body.scrollIntoView(); // Scroll to top
}

exports.showQuitDialog = showQuitDialog;
