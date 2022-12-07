// Message if login is successful or disbanded
const loginMessage = document.querySelector('#login-message');

// Login form selectors
const loginForm = document.querySelector('#login-form');
const loginName = document.querySelector('#login-name');
const loginPwd = document.querySelector('#login-pwd');

// Open the login form/modal
const modal = document.querySelector('#loginModal');
const btn = document.querySelector('#loginBtn');
const btnClose = document.querySelector('#close');

// Import API for login the user
import { API_HOST_LOGIN } from '../auth/apiBase.js';
import { redirect } from '../../components/function.js';
import { errorMessage, successMessage } from '../../components/message.js';

/* const method = 'POST';
const body = 'JSON.stringify(data)'; */

export function openLoginForm() {
  btn.onclick = function () {
    modal.style.display = 'block';
  };

  btnClose.onclick = function () {
    modal.style.display = 'none';
  };
}

/**
 * This is the log in function for the site.
 * When the login button is pressed after value is enter
 * the process is starting.w
 * @param loginUser
 */

export function loginUser() {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const loginValue = {
      email: loginName.value,
      password: loginPwd.value,
    };

    console.log(loginValue);
    async function loginRequested(API_HOST_LOGIN, data) {
      try {
        const loginTheUser = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };
        const response = await fetch(API_HOST_LOGIN, loginTheUser);
        const json = await response.json();
        const accessToken = json.accessToken;

        //console.log(response);
        //console.log(json);

        if (response.ok === true) {
          localStorage.setItem('myToken', accessToken);
          localStorage.setItem('myName', json.name);
          localStorage.setItem('myEmail', json.email);
          localStorage.setItem('myAvatar', json.avatar);
          localStorage.setItem('myCredit', json.credits);
          loginMessage.innerHTML = successMessage(
            'Log in was successful, you will be redirected'
          );
          redirect(response);
          return json;
        } else {
          loginMessage.innerHTML = errorMessage('Wrong password or username!');
          console.log('Not able to log in');
        }
      } catch (error) {
        loginMessage.innerHTML = errorMessage(
          'Not able to contact server! Try again later!'
        );
      }
    }

    loginRequested(`${API_HOST_LOGIN}`, loginValue);
  });
}
