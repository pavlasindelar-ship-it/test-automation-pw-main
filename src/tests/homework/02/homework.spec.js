require("dotenv").config();
import { test, expect } from '@playwright/test';
import {RegistrationPage} from './RegistrationPage.js';

const {
    USER_USERNAME,
    USER_EMAIL,
    USER_PASSWORD,
    INVALID_USER_PASSWORD,
}= process.env

test.describe("registration page", () => {

    let registrationPage;
    
    test.beforeEach(async ({ page }) => {
        registrationPage = new RegistrationPage(page);
        await registrationPage.openPage();
    }); 

    test("valid registration", { tag: ["@happyway", "@valid"] }, async ({ page }) => {
        await registrationPage.register({
          name: USER_USERNAME,
          email: registrationPage.emailGenerator.createNewEmail(), 
          userPassword: USER_PASSWORD, 
          confirmPassword: USER_PASSWORD
        });
        await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci");
    });

    test("invalid registration with existing mail", { tag: "@invalid" }, async ({ page }) => {
        await registrationPage.register({
          name: USER_USERNAME,
          email: USER_EMAIL, 
          userPassword: USER_PASSWORD, 
          confirmPassword: USER_PASSWORD
        });
        await expect(page.locator("text=Účet s tímto emailem již existuje")).toBeVisible();
    });

    test("invalid registration with incorrect password", { tag: "@invalid" }, async ({ page }) => {
        await registrationPage.register({
          name: USER_USERNAME,
          email: registrationPage.emailGenerator.createNewEmail(), 
          userPassword: INVALID_USER_PASSWORD, 
          confirmPassword: INVALID_USER_PASSWORD
        });
        await expect(page.locator("text=Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici")).toBeVisible();
    });
    
    test("invalid registration with incorrect confirmation", { tag: "@invalid" }, async ({ page }) => {
        await registrationPage.register({
          name: USER_USERNAME,
          email: registrationPage.emailGenerator.createNewEmail(), 
          userPassword: USER_PASSWORD,
          confirmPassword: INVALID_USER_PASSWORD
        });
        await expect(page.locator("text=Hesla se neshodují")).toBeVisible();
    });

});