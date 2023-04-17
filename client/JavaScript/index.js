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
confirmPasswordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    if (confirmPassword !== password) {
        confirmPasswordInput.setCustomValidity('Passwords do not match');
        return;
    }
    else {
        confirmPasswordInput.setCustomValidity('');
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
loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const formObject = {};
    formData.forEach((value, key) => { formObject[key] = value; });
    login.sendLoginData(formObject);
});
