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