var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Login, Cookies } from './backendCalls/sendLoginData.js';
// form validation for login
const loginForm = document.getElementById("loginForm");
//these variables create the login and register modals
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
loginForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    event.stopPropagation();
    if (!loginForm.checkValidity()) {
        loginForm.classList.add('was-validated');
        return;
    }
    loginModal.hide();
    loginForm.classList.add('was-validated');
    if (loginForm.checkValidity()) {
        try {
            const login = new Login("http://localhost:3001");
            const form = document.getElementById('loginForm');
            const formData = new FormData(form);
            const username = formData.get('userName');
            const password = formData.get('password');
            login.sendLoginData({
                "username": username,
                "password": password
            });
        }
        catch (error) {
            // Display an error message
            console.error(error);
            alert('An error occurred while logging in. Please try again.');
        }
    }
}), false);
const modals = () => {
    //these variables determine the button elements in the html to handle the modals
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const linkToLogin = document.getElementById('toLogin');
    const linkToRegister = document.getElementById('toRegister');
    //these event listeners handle the buttons and opens and closes the modals
    // login button event listener
    registerButton.addEventListener('click', () => {
        registerModal.show();
    });
    loginButton.addEventListener('click', () => {
        loginModal.show();
    });
    linkToLogin.addEventListener('click', () => {
        registerModal.hide();
        loginModal.show();
    });
    linkToRegister.addEventListener('click', () => {
        loginModal.hide();
        registerModal.show();
    });
    const logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', () => {
        const cookies = new Cookies();
        cookies.setCookie('session_token', '', -1);
        window.location.reload();
    });
};
const loginLogout = () => {
    const cookies = new Cookies();
    cookies.getCookie('session_token');
    //todo:validate token
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    if (cookies.getCookie('session_token') == null) {
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
    }
    else {
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
    }
};
modals();
loginLogout();
