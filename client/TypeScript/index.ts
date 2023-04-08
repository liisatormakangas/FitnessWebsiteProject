const backendUrl = "http://localhost:3001/register";
const registerForm = document.getElementById("registerForm") as HTMLFormElement;

registerForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);

    fetch(backendUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
});




