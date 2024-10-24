
class Api {
    constructor(options) {
        // constructor body
    }

    getInitialCards() {

        return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
            headers: {
                authorization: "9e68d7b8-65ac-4026-8ffb-a48d38eaf0d6"
            }
        })
            .then(res => res.json())

    }

    // other methods for working with the API
}

export default Api;