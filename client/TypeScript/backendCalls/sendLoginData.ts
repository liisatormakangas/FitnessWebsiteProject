class Login {
    #backendurl = "";

    constructor(backendurl: string) {
        this.#backendurl = backendurl;
    }

    sendLoginData = async (formObject: object) => {
        fetch(this.#backendurl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formObject)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }
}

export { Login };