import { test, expect } from '@playwright/test';

test.describe("login page", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("https://team8-2022brno.herokuapp.com/registrace");
    }); 

    test("valid registration", { tag: "@happypath" }, async ({ page }) => {
        const aktualniCas = Date.now();
        await page.locator("input#name").fill("Pavla Šindelářová");
        await page.locator("input#email").fill("pavla.sindelar" + aktualniCas + "@gmail.com");
        await page.locator("input#password").fill("Pavla12345");
        await page.locator("input#password-confirm").fill("Pavla12345");
        await page.locator(".btn-primary").click();
        await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci");
    });

    test("invalid registration with existing mail", { tag: "@invalid" }, async ({ page }) => {
        let aktualniCas = Date.now();
        await page.locator("input#name").fill("Pavla Šindelářová");
        await page.locator("input#email").fill("pavla.sindelar@gmail.com");
        await page.locator("input#password").fill("Pavla12345");
        await page.locator("input#password-confirm").fill("Pavla12345");
        await page.locator(".btn-primary").click();
        await expect(page.locator("text=Účet s tímto emailem již existuje")).toBeVisible();
    });

    test("invalid registration with incorrect password", { tag: "@invalid" }, async ({ page }) => {
        const aktualniCas = Date.now();
        await page.locator("input#name").fill("Pavla Šindelářová");
        await page.locator("input#email").fill("pavla.sindelar" + aktualniCas + "@gmail.com");
        await page.locator("input#password").fill("12345");
        await page.locator("input#password-confirm").fill("12345");
        await page.locator(".btn-primary").click();
        await expect(page.locator("text=Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici")).toBeVisible();
    });
});
 