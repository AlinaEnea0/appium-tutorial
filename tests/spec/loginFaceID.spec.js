const actionUtils = require('../../utils/actionUtils');
describe('iOS face ID test', () => {

  before(async () => {
    await driver.execute('mobile: enrollBiometric', { isEnabled: true });
  });

  it('should login successfully with Face ID', async () => {
    const loginBtn = await $('//XCUIElementTypeButton[@name="Log In"]');
    await loginBtn.click();

    // Accept system Face ID dialog if needed
    if (await driver.getAlertText().catch(() => false)) {
      await driver.acceptAlert();
    }

    await driver.execute('mobile: sendBiometricMatch', {
      type: 'faceId',
      match: true
    });

    const logoutBtn = await $('//XCUIElementTypeButton[@name="Log Out"]');
    await logoutBtn.waitForDisplayed({ timeout: 5000 });

    await actionUtils.assertIsDisplayed(logoutBtn)  

    await logoutBtn.click();
  });

  it('should show error on failed Face ID', async () => {
    const loginBtn = await $('//XCUIElementTypeButton[@name="Log In"]');
    await loginBtn.click();

    await driver.execute('mobile: sendBiometricMatch', {
      type: 'faceId',
      match: false
    });

    // Wait for alert and dismiss it
    if (await driver.getAlertText().catch(() => false)) {
      await driver.dismissAlert();
    }
  });
});