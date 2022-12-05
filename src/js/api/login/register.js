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

        console.log(json);
      } catch (error) {
        console.log('Error to login');
      }
    }

    loginRequested(`${API_HOST_REGISTER}`, registerValue);
  });
}
