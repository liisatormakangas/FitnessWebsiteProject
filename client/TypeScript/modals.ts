
// form validation for login
const loginForm = document.getElementById("loginForm") as HTMLFormElement;

//these variables create the login and register modals
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
// export const notificationModal = new bootstrap. Modal(document.getElementById('notificationModal'));

loginForm.addEventListener('submit', (event: Event) => {
    if (!loginForm.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    } else {
        loginModal.hide();
    }

    loginForm.classList.add('was-validated')

}, false);

const modals = () => {
    //these variables determine the button elements in the html to handle the modals
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
    const registerButton = document.getElementById('registerButton') as HTMLButtonElement;
    const linkToLogin: any = document.getElementById('toLogin');
    const linkToRegister: any = document.getElementById('toRegister');

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
}
modals();