const backendUrl = "http://localhost:3001/register";
const registerForm = document.getElementById("registerForm") as HTMLFormElement;

const passwordInput = document.getElementById('passwd') as HTMLInputElement;
const confirmPasswordInput = document.getElementById('passwd2') as HTMLInputElement;

confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (confirmPassword !== password) {
        confirmPasswordInput.setCustomValidity('Passwords do not match');
        return
    } else {
        confirmPasswordInput.setCustomValidity('');
    }
});

registerForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const formObject = {};
    formData.forEach((value, key) => { formObject[key] = value });

    fetch(backendUrl, {
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
});




