export class UrlPage {

    constructor(page) {
        this.pwPage = page;
    }

    async openPage() {
        await this.pwPage.goto("https://team8-2022brno.herokuapp.com/registrace");
    }

}

const {
    EMAIL_WITHOUT_DOMAIN,
    EMAIL_DOMAIN,
}= process.env

export class EmailGenerator {

    createNewEmail() {
    return EMAIL_WITHOUT_DOMAIN + Date.now() + EMAIL_DOMAIN;
    }

}
