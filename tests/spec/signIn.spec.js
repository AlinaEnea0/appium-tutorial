describe('[@android] Login Test', () => {
    it('Parallelization : should login with valid credentials', async () => {
      const signInButton = await $('~signIn_btn');
  
      await signInButton.click();
  
      const countryPrefix = await $('~countryPrefix_icn');
      await expect(countryPrefix).toBeDisplayed();
    });
  });