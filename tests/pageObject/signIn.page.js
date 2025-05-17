class SignInPage {
    get signIn_btn() { return $('~signIn_btn'); }

    async signIn() {
        await actionUtils.click(this.signIn_btn);
    }
    
}
