export class UrlPage {

        constructor(page) {
        this.pwPage = page;
    }

    async openPage() {
        await this.pwPage.goto("https://team8-2022brno.herokuapp.com/registrace");
}

}