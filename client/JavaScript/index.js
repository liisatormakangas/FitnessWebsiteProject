import { Register } from "./backendCalls/sendRegisterData.js";
import { Login } from "./backendCalls/sendLoginData.js";
const backendUrlRegister = "http://localhost:3001/register";
const backendUrlLogin = "http://localhost:3001/login";
const register = new Register(backendUrlRegister);
const login = new Login(backendUrlLogin);
const registerForm = document.getElementById("registerForm");
const passwordInput = document.getElementById('passwd');
const confirmPasswordInput = document.getElementById('passwd2');
const loginForm = document.getElementById("loginForm");
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
    if (form.checkValidity() && passwordInput.value === confirmPasswordInput.value) {
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
// loginForm.addEventListener("submit", (event: Event) => {
//     event.preventDefault();
//     const formData = new FormData(loginForm);
//     const formObject = {};
//     formData.forEach((value, key) => { formObject[key] = value });
//     login.sendLoginData(formObject);
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const formObject = {};
    formData.forEach((value, key) => { formObject[key] = value; });
    login.sendLoginData(formObject);
});
