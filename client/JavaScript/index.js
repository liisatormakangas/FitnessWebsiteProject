import { Register } from "./backendCalls/sendRegisterData.js";
import { Cookies } from "./backendCalls/sendLoginData.js";
const backendUrlRegister = "http://localhost:3001/register";
const register = new Register(backendUrlRegister);
const registerForm = document.getElementById("registerForm");
const passwordInput = document.getElementById('passwd');
const confirmPasswordInput = document.getElementById('passwd2');
const blogLinks = document.querySelectorAll(".blog-btn");
registerForm.addEventListener('submit', (event) => {
    if (!registerForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }
    registerForm.classList.add('was-validated');
});
registerForm.addEventListener('input', (event) => {
    if (registerForm.checkValidity() && passwordInput.value === confirmPasswordInput.value) {
        document.querySelector('#submitRegisterData').removeAttribute('disabled');
        confirmPasswordInput.classList.remove('is-invalid');
    }
    else {
        document.querySelector('#submitRegisterData').setAttribute('disabled', '');
        confirmPasswordInput.classList.add('is-invalid');
    }
});
confirmPasswordInput.addEventListener('input', (event) => {
    if (registerForm.checkValidity() && passwordInput.value === confirmPasswordInput.value) {
        document.querySelector('#submitRegisterData').removeAttribute('disabled');
    }
    else {
        confirmPasswordInput.classList.add('is-invalid');
        document.querySelector('#submitRegisterData').setAttribute('disabled', '');
    }
});
registerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(registerForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
        console.log("formObject[key]");
    });
    register.addRegisteredUser(formObject);
});
blogLinks.forEach((blogLink) => {
    blogLink.addEventListener("click", (event) => {
        event.preventDefault();
        const cookie = new Cookies();
        const isLoggedIn = cookie.isCookieSet("session_token");
        if (isLoggedIn) {
            const id = event.currentTarget.getAttribute('data-id');
            window.location.href = `blogArticle.html?id=${id}`;
        }
        else {
            alert("You need to be logged in to read the full article");
        }
    });
});
