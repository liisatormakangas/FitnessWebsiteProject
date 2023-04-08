// form validation for modals
(() => {
    'use strict'
  
    // Fetch the forms we want to apply custom Bootstrap validation 
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form: HTMLFormElement)=> {
        form.addEventListener('submit', (event: Event)=> {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false);
      });
  })();

const modals = () => {
    //these variables determine the button elements in the html to handle the modals
    const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
    const registerButton = document.getElementById('registerButton') as HTMLButtonElement;
    const linkToLogin: any = document.getElementById('toLogin');
    const linkToRegister: any = document.getElementById('toRegister');

    //these variables create the login and register modals
    const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));

    //these event listeners handle the buttons and opens and closes the modals
    loginButton.addEventListener('click', () => {
        loginModal.show();
    });

    registerButton.addEventListener('click', (event) => {
        event.preventDefault();
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