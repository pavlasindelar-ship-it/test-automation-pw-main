require("dotenv").config();
import { test, expect } from '@playwright/test';

const {
  USER_USERNAME,
  USER_EMAIL,
  USER_PASSWORD,
  INVALID_USER_PASSWORD,
  EMAIL_WITHOUT_DOMAIN,
  EMAIL_DOMAIN
} = process.env;

const userData = {
    name: USER_USERNAME,
    email: USER_EMAIL,
    userPassword: USER_PASSWORD,
    invalidPassword: INVALID_USER_PASSWORD,
    confirmPassword: USER_PASSWORD,
    emailWithoutDomain: EMAIL_WITHOUT_DOMAIN,
    emailDomain: EMAIL_DOMAIN
};

class RegistrationPage {
  constructor(page) {
    this.page = page;
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

function createNewEmail() {
    return userData.emailWithoutDomain + Date.now() + userData.emailDomain;
}

test.describe("login page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://team8-2022brno.herokuapp.com/registrace");
    }); 

    test("valid registration", { tag: ["@happyway", "@valid"] }, async ({ page }) => {
        const registration = new RegistrationPage(page);
        await registration.register({
            name: userData.name, 
            email: createNewEmail(), 
            userPassword: userData.userPassword, 
            confirmPassword: userData.confirmPassword
        });
        await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci");
    });

    test("invalid registration with existing mail", { tag: "@invalid" }, async ({ page }) => {
        await fillRegistrationForm(page, {
            name: userData.name, 
            email: userData.email,
            userPassword: userData.userPassword,
            confirmPassword: userData.confirmPassword
        });
        await expect(page.locator("text=Účet s tímto emailem již existuje")).toBeVisible();
    });

    test("invalid registration with incorrect password", { tag: "@invalid" }, async ({ page }) => {
        await fillRegistrationForm(page, {
            name: userData.name,
            email: createNewEmail(),
            userPassword: userData.invalidPassword,
            confirmPassword: userData.invalidPassword
        });
        await expect(page.locator("text=Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici")).toBeVisible();
    });
    
    test("invalid registration with incorrect confirmation", { tag: "@invalid" }, async ({ page }) => {
        await fillRegistrationForm(page, {
            name: userData.name,
            email: createNewEmail(),
            userPassword: userData.userPassword,
            confirmPassword: userData.invalidPassword
        });
        await expect(page.locator("text=Hesla se neshodují")).toBeVisible();
    });

});