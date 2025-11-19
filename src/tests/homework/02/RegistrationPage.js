import { UrlPage } from "./UrlPage.js";

export class RegistrationPage extends UrlPage {

        constructor(page) {
        
        super(page);    

        this.nameInput = page.locator("input#name");
        this.emailInput = page.locator("input#email");
        this.passwordInput = page.locator("input#password");
        this.confirmInput = page.locator("input#password-confirm");
        this.submitButton = page.locator(".btn-primary");
    }

    async fillForm({ name, email, userPassword, confirmPassword }) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(userPassword);
        await this.confirmInput.fill(confirmPassword);
    }

    async submit() {
        await this.submitButton.click();
    }

    async register(userData) {
        await this.fillForm(userData);
        await this.submit();
    }
   
}
