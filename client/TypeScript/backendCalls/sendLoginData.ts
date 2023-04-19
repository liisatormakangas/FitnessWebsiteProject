
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
                console.log( data);
                if (data.message =='Login successful') {
                    // Login successful, change login button text to logout
                    document.getElementById("loginButton").textContent = "Logout";
                    // Save the token in the browser's local storage
                    localStorage.setItem("token", data.token);
                    // Display a welcome message
                    alert("Login successed. welcome! " + data.username);
                    
                } else {
                    // Login failed, display error message
                    alert("Login failed. Please try again.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("An error occurred while processing your request. Please try again.");
            })
    
            // const loginButton = document.getElementById("loginButton");

            // if (loginButton.textContent === "Login") {
            // // User is logged out, so show login form
            // const loginForm = document.getElementById("loginForm");
            // loginForm.style.display = "block";
            // } else {
            // // User is logged in, so show logout button
            // const logoutButton = document.createElement("button");
            // logoutButton.textContent = "Logout";
            // logoutButton.addEventListener("click", () => {
            //     // Handle logout logic here
            // });

            // loginButton.replaceWith(logoutButton);
            // }
           
    }

}

export { Login };

