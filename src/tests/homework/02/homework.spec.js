require("dotenv").config();
import { test, expect } from '@playwright/test';

const {
    USER_USERNAME,
    USER_EMAIL,
    USER_PASSWORD,
    INVALID_USER_PASSWORD,
    EMAIL_WITHOUT_DOMAIN,
    EMAIL_DOMAIN,
}= process.env

async function fillRegistrationForm(page, name, email, userPassword, confirmPassword) {
    await page.locator("input#name").fill(name);
    await page.locator("input#email").fill(email);
    await page.locator("input#password").fill(userPassword);
    await page.locator("input#password-confirm").fill(confirmPassword);
    await page.locator(".btn-primary").click();
}

function createNewEmail() {
    return EMAIL_WITHOUT_DOMAIN + Date.now() + EMAIL_DOMAIN;
}

test.describe("login page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://team8-2022brno.herokuapp.com/registrace");
    }); 

    test("valid registration", { tag: ["@happyway", "@valid"] }, async ({ page }) => {
        await fillRegistrationForm(page, USER_USERNAME, createNewEmail(), USER_PASSWORD, USER_PASSWORD);
        await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci");
    });

    test("invalid registration with existing mail", { tag: "@invalid" }, async ({ page }) => {
        await fillRegistrationForm(page, USER_USERNAME, USER_EMAIL, USER_PASSWORD, USER_PASSWORD);
        await expect(page.locator("text=Účet s tímto emailem již existuje")).toBeVisible();
    });

    test("invalid registration with incorrect password", { tag: "@invalid" }, async ({ page }) => {
        await fillRegistrationForm(page, USER_USERNAME, createNewEmail(), INVALID_USER_PASSWORD, INVALID_USER_PASSWORD);
        await expect(page.locator("text=Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici")).toBeVisible();
    });
    
    test("invalid registration with incorrect confirmation", { tag: "@invalid" }, async ({ page }) => {
        await fillRegistrationForm(page, USER_USERNAME, createNewEmail(), USER_PASSWORD, INVALID_USER_PASSWORD);
        await expect(page.locator("text=Hesla se neshodují")).toBeVisible();
    });

});
 