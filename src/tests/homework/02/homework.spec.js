require("dotenv").config();
import { test, expect } from '@playwright/test';
import {RegistrationPage} from './RegistrationPage.js';

const {
    USER_USERNAME,
    USER_EMAIL,
    USER_PASSWORD,
    INVALID_USER_PASSWORD,
    EMAIL_WITHOUT_DOMAIN,
    EMAIL_DOMAIN,
}= process.env

function createNewEmail() {
    return EMAIL_WITHOUT_DOMAIN + Date.now() + EMAIL_DOMAIN;
}

test.describe("login page", () => {

    let registrationPageObject;
    
    test.beforeEach(async ({ page }) => {
        registrationPageObject = new RegistrationPage(page);
        registrationPageObject.goto();
    }); 

    test("valid registration", { tag: ["@happyway", "@valid"] }, async ({ page }) => {
        await registrationPageObject.register({
          name: USER_USERNAME,
          email: createNewEmail(), 
          userPassword: USER_PASSWORD, 
          confirmPassword: USER_PASSWORD
        });
        await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci");
    });

    test("invalid registration with existing mail", { tag: "@invalid" }, async ({ page }) => {
        await registrationPageObject.register({
          name: USER_USERNAME,
          email: USER_EMAIL, 
          userPassword: USER_PASSWORD, 
          confirmPassword: USER_PASSWORD
        });
        await expect(page.locator("text=Účet s tímto emailem již existuje")).toBeVisible();
    });

    test("invalid registration with incorrect password", { tag: "@invalid" }, async ({ page }) => {
        await registrationPageObject.register({
          name: USER_USERNAME,
          email: createNewEmail(), 
          userPassword: INVALID_USER_PASSWORD, 
          confirmPassword: INVALID_USER_PASSWORD
        });
        await expect(page.locator("text=Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici")).toBeVisible();
    });
    
    test("invalid registration with incorrect confirmation", { tag: "@invalid" }, async ({ page }) => {
        await registrationPageObject.register({
          name: USER_USERNAME,
          email: createNewEmail(), 
          userPassword: USER_PASSWORD,
          confirmPassword: INVALID_USER_PASSWORD
        });
        await expect(page.locator("text=Hesla se neshodují")).toBeVisible();
    });

});