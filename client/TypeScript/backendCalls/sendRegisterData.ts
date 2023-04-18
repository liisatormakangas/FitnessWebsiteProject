class Register {
    #backendurl = "";

    constructor(backendurl: string) {
        this.#backendurl = backendurl;
    }

    addRegisteredUser = async (formObject: object) => {
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

export { Register };