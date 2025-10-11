import { test, expect } from '@playwright/test';
 
test("homework", async ({ page }) => {
    // place for your homework code
    await page.goto("https://team8-2022brno.herokuapp.com/registrace");
    //CSS Jméno a Příjmení
    await page.locator("input#name").fill("Pavla Šindelářová");
    await page.locator("input#name").screenshot({ path : "src/tests/homework/jmeno_css.png"});
    //Xpath Jméno a Příjmení
    await page.locator("//input[@id='name']").fill("Pavla Šindelářová");
    await page.locator("//input[@id='name']").screenshot({ path : "src/tests/homework/jmeno_xpath.png"});
    //Playwright Jméno a Příjmení
    await page.getByLabel("Jméno a příjmení").fill("Pavla Šindelářová");
    await page.getByLabel("Jméno a příjmení").screenshot({ path : "src/tests/homework/jmeno_pw.png"});

    //CSS Email
    await page.locator("input#email").fill("pavla.sindelar@gmail.com");
    await page.locator("input#email").screenshot({ path : "src/tests/homework/email_css.png"});
    //Xpath Email
    await page.locator("//input[@id='email']").fill("pavla.sindelar@gmail.com");
    await page.locator("//input[@id='email']").screenshot({ path : "src/tests/homework/email_xpath.png"});
    //Playwright Email
    await page.getByLabel("Email").fill("pavla.sindelar@gmail.com");
    await page.getByLabel("Email").screenshot({ path : "src/tests/homework/email_pw.png"});

    //CSS Heslo
    await page.locator("input#password").fill("12345");
    await page.locator("input#password").screenshot({ path : "src/tests/homework/heslo_css.png"});
    //Xpath Heslo
    await page.locator("//input[@id='password']").fill("12345");
    await page.locator("//input[@id='password']").screenshot({ path : "src/tests/homework/heslo_xpath.png"});
    //Playwright Heslo
    await page.getByLabel("Heslo").fill("12345");
    await page.getByLabel("Heslo").screenshot({ path : "src/tests/homework/heslo_pw.png"});

    //CSS Kontrola hesla
    await page.locator("input#password-confirm").fill("12345");
    await page.locator("input#password-confirm").screenshot({ path : "src/tests/homework/kontrola_css.png"});
    //Xpath Kontrola hesla
    await page.locator("//input[@id='password-confirm']").fill("12345");
    await page.locator("//input[@id='password-confirm']").screenshot({ path : "src/tests/homework/kontrola_xpath.png"});
    //Playwright Kontrola hesla
    await page.getByLabel("Kontrola hesla").fill("12345");
    await page.getByLabel("Kontrola hesla").screenshot({ path : "src/tests/homework/kontrola_pw.png"});

    //CSS Registrace
    await page.locator(".btn-primary").click();
    await page.locator(".btn-primary").screenshot({ path : "src/tests/homework/registrace.png"});
    //Xpath Registrace
    await page.locator("//button[@type='submit']").click();
    await page.locator("//button[@type='submit']").screenshot({ path : "src/tests/homework/registrace_xpath.png"});
    //Playwright Registrace
    await page.getByText("Zaregistrovat").click();
    await page.getByText("Zaregistrovat").screenshot({ path : "src/tests/homework/registrace_pw.png"});
});