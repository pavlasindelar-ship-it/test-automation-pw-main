const {
    EMAIL_WITHOUT_DOMAIN,
    EMAIL_DOMAIN,
}= process.env

export class CreateNewEmail {

    createNewEmail() {
    return EMAIL_WITHOUT_DOMAIN + Date.now() + EMAIL_DOMAIN;
    }

}