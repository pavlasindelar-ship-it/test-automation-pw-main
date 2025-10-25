import { test, expect } from '@playwright/test';
 
test("homework 1", async ({ page }) => {
    await page.goto("https://team8-2022brno.herokuapp.com/registrace");
    const aktualniCas = Date.now();
    await page.locator("input#name").fill("Pavla Šindelářová");
    await page.locator("input#email").fill("pavla.sindelar" + aktualniCas + "@gmail.com");
    await page.locator("input#password").fill("Pavla12345");
    await page.locator("input#password-confirm").fill("Pavla12345");
    await page.locator(".btn-primary").click();
    await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci");
});

test("homework 2", async ({ page }) => {
    await page.goto("https://team8-2022brno.herokuapp.com/registrace");
    let aktualniCas = Date.now();
    await page.locator("input#name").fill("Pavla Šindelářová");
    await page.locator("input#email").fill("pavla.sindelar@gmail.com");
    await page.locator("input#password").fill("Pavla12345");
    await page.locator("input#password-confirm").fill("Pavla12345");
    await page.locator(".btn-primary").click();
    await expect(page.locator("text=Účet s tímto emailem již existuje")).toBeVisible();
});

test("homework 3", async ({ page }) => {
    await page.goto("https://team8-2022brno.herokuapp.com/registrace");
    const aktualniCas = Date.now();
    await page.locator("input#name").fill("Pavla Šindelářová");
    await page.locator("input#email").fill("pavla.sindelar" + aktualniCas + "@gmail.com");
    await page.locator("input#password").fill("12345");
    await page.locator("input#password-confirm").fill("12345");
    await page.locator(".btn-primary").click();
    await expect(page.locator("text=Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici")).toBeVisible();
});
