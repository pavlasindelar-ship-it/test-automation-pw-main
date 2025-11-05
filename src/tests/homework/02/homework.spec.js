require("dotenv").config();
import { test, expect } from '@playwright/test';

const userUsername = process.env.USER_USERNAME
const userEmail = process.env.USER_EMAIL
const userPassword = process.env.USER_PASSWORD
const invalidPassword = process.env.INVALID_USER_PASSWORD
const emailWithoutDomain = process.env.EMAIL_WITHOUT_DOMAIN
const emailDomain = process.env.EMAIL_DOMAIN
const aktualniCas = Date.now();

function getUserNameLocator(page) {
    return page.locator("input#name");
}

function getEmailLocator(page) {
    return page.locator("input#email");
}

function getPasswordLocator(page) {
    return page.locator("input#password");
}

function getPasswordConfirmationLocator(page) {
    return page.locator("input#password-confirm");
}

function getButtonClickLocator(page) {
    return page.locator(".btn-primary");
}

async function fillRegistrationForm(page, userUsername, userPassword) {
    await getUserNameLocator(page).fill(userUsername);
    await getPasswordLocator(page).fill(userPassword);
    await getPasswordConfirmationLocator(page).fill(userPassword);
}

test.describe("login page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://team8-2022brno.herokuapp.com/registrace");
    }); 

    test("valid registration", { tag: ["@happyway", "@valid"] }, async ({ page }) => {
        await fillRegistrationForm(page, userUsername, userPassword);
        await getEmailLocator(page).fill(emailWithoutDomain + aktualniCas + emailDomain);
        await getButtonClickLocator(page).click();
        await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci");
    });

    test("invalid registration with existing mail", { tag: "@invalid" }, async ({ page }) => {
        await fillRegistrationForm(page, userUsername, userPassword);
        await getEmailLocator(page).fill(userEmail);
        await getButtonClickLocator(page).click();
        await expect(page.locator("text=Účet s tímto emailem již existuje")).toBeVisible();
    });

    test("invalid registration with incorrect password", { tag: "@invalid" }, async ({ page }) => {
        await fillRegistrationForm(page, userUsername, invalidPassword);
        await getEmailLocator(page).fill(emailWithoutDomain + aktualniCas + 1 + emailDomain);
        await getButtonClickLocator(page).click();
        await expect(page.locator("text=Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici")).toBeVisible();
    });
});
 