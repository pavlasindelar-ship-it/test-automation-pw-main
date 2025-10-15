import { test } from "@playwright/test";

test("should open login page", async ({ page }) => {
    await page.goto("https://team8-2022brno.herokuapp.com/prihlaseni");
    await page.locator("input#email").screenshot({ path: "css_id_email.png"});
    await page.locator(".btn-primary").screenshot({ path: "submit_btn.png"});
    await page.locator("div").locator("form").locator("input[type$='word']").screenshot({path: "chain.png"});
    await page.getByRole("heading", {level: 1}).screenshot({ path: "heading.png"});
    await page.getByText("Zapomněli jste své heslo?").screenshot({ path: "passsfgt.png"});
    await page.getByLabel("Email").screenshot({ path: "by_label.png"});
    console.log(await page.title());
});

test("lesson 3", async ({ page }) => {
    await page.goto("https://team8-2022brno.herokuapp.com/prihlaseni");
    const headingLocator = page.getByRole("heading", {level: 1});
    const headingText = await headingLocator.textContent();
    console.log(headingText);
    const emailField = page.getByLabel("Email");
    console.log("Is email filed visible?" + await emailField.isVisible());
    console.log("Is email field enabled?" + await emailField.isEnabled());

    const forgotPassword = page.getByText("Zapomněli jste své heslo?");
    console.log("Forgot password href: " + await forgotPassword.getAttribute("href"));
});

test("heslo", async ({ page }) => {
    await page.goto("https://team8-2022brno.herokuapp.com/prihlaseni");
    const passwordField = page.getByLabel("Heslo");
    console.log("Is visible?" + await passwordField.isVisible());
    console.log("Is enabled?" + await passwordField.isEnabled());
});

test("tlacitko", async ({ page }) => {
    await page.goto("https://team8-2022brno.herokuapp.com/prihlaseni");
    const accessButton = page.getByRole("button", {name: "Přihlásit"});
    const emailField = page.getByLabel("Email");
    const passwordField = page.getByLabel("Heslo");
    console.log("Text" + await accessButton.textContent());

    await emailField.fill("da-app.admin@czechitas.cz");
    await passwordField.fill("Czechitas123");
    await accessButton.click();

    const userName = page.locator(".navbar-right").locator("strong");
    console.log("Logged user: " + await userName.textContent());
});






