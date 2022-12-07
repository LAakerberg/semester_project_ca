// Message if register is successful or disbanded
const registerMessage = document.querySelector('#register-message');

// Login form selectors
const registerForm = document.querySelector('#register-form');
const registerName = document.querySelector('#register-name');
const registerEmail = document.querySelector('#register-email');
const registerAvatar = document.querySelector('#register-avatar');
const registerPwd = document.querySelector('#register-pwd');

// Open the login form/modal
const signUpModal = document.querySelector('#signupModal');
const signUpBtn = document.querySelector('#registerBtn');
const signUpBtnClose = document.querySelector('#signup-close');

// Import API for login the user
import { API_HOST_REGISTER } from '../auth/apiBase.js';
import { redirect } from '../../components/function.js';
import { errorMessage, successMessage } from '../../components/message.js';

/* const method = 'POST';
const body = 'JSON.stringify(data)'; */

export function openRegisterForm() {
  signUpBtn.onclick = function () {
    signUpModal.style.display = 'block';
  };

  signUpBtnClose.onclick = function () {
    signUpModal.style.display = 'none';
  };
}

/**
 * This is the log in function for the site.
 * When the login button is pressed after value is enter
 * the process is starting.w
 * @param loginUser
 */

export function registerUser() {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const registerValue = {
      name: registerName.value,
      email: registerEmail.value,
      avatar: registerAvatar.value,
      password: registerPwd.value,
    };

    console.log(registerValue);
    async function loginRequested(API_HOST_REGISTER, data) {
      try {
        const registerTheUser = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(API_HOST_REGISTER, registerTheUser);
        const json = await response.json();
        const errorLog = json.errors[0].message;

        if (response.ok === true) {
          registerMessage.innerHTML = successMessage(
            'Registration was successful, you will be redirected'
          );
          //redirect(response);
        } else {
          registerMessage.innerHTML = errorMessage('Not able to register user');
        }

        registerMessage.innerHTML = errorMessage(
          `Not able to register user! [${errorLog}]`
        );
      } catch (error) {
        console.log('Error to login');
      }
    }

    loginRequested(`${API_HOST_REGISTER}`, registerValue);
  });
}
