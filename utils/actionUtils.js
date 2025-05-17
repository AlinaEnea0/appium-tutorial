
class ActionUtils {
    async assertIsDisplayed(element, displayed = true, timeout = 15000) {
        if (displayed) {
            const exists = await element.waitForExist({ timeout });
            if (!exists) {
                throw new Error(`Element does not exist after ${timeout}ms`);
            }
            await element.waitForDisplayed({ timeout });
            expect(await element.isDisplayed()).toBe(true);
        } else {
            const exists = await element.isExisting();
            expect(exists).toBe(false);
        }
    }
}
module.exports = new ActionUtils();