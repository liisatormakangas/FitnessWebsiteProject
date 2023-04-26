import { Register } from "./backendCalls/sendRegisterData.js";


const backendUrlRegister = "http://localhost:3001/register";


const register = new Register(backendUrlRegister);



const registerForm = document.getElementById("registerForm") as HTMLFormElement;
const passwordInput = document.getElementById('passwd') as HTMLInputElement;
const confirmPasswordInput = document.getElementById('passwd2') as HTMLInputElement;

const loginForm = document.getElementById("loginForm") as HTMLFormElement;

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
    } else {
      document.querySelector('#submitRegisterData').setAttribute('disabled', '');
      confirmPasswordInput.classList.add('is-invalid');
    }
  });

  confirmPasswordInput.addEventListener('input', (event) => {
    if (registerForm.checkValidity() && passwordInput.value === confirmPasswordInput.value) {
      document.querySelector('#submitRegisterData').removeAttribute('disabled');
    } else {
      confirmPasswordInput.classList.add('is-invalid');
      document.querySelector('#submitRegisterData').setAttribute('disabled', '');
    }
  });

registerForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const formData = new FormData(registerForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
        console.log("formObject[key]");
    });

    register.addRegisteredUser(formObject);
});
