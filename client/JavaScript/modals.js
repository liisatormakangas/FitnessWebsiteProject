// form validation for login
const loginForm = document.getElementById("loginForm");
//these variables create the login and register modals
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
loginForm.addEventListener('submit', (event) => {
    if (!loginForm.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
    }
    else {
        loginModal.hide();
    }
    loginForm.classList.add('was-validated');
}, false);
const modals = () => {
    //these variables determine the button elements in the html to handle the modals
    const loginButton = document.getElementById('loginButton');
    const registerButton = document.getElementById('registerButton');
    const linkToLogin = document.getElementById('toLogin');
    const linkToRegister = document.getElementById('toRegister');
    //these event listeners handle the buttons and opens and closes the modals
    loginButton.addEventListener('click', () => {
        loginModal.show();
    });
    registerButton.addEventListener('click', () => {
        registerModal.show();
    });
    linkToLogin.addEventListener('click', () => {
        registerModal.hide();
        loginModal.show();
    });
    linkToRegister.addEventListener('click', () => {
        loginModal.hide();
        registerModal.show();
    });
};
modals();
