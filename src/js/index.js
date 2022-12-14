// Login in user if the value is correct
import { loginUser } from './api/login/login.js';

loginUser();

// Open the login form/modal
import { openLoginForm } from './api/login/login.js';

openLoginForm();

import { openRegisterForm } from './api/login/register.js';

openRegisterForm();

import { registerUser } from './api/login/register.js';

registerUser();

/* When visit the homepage "First index.html", clear the localStorage.
This will push the user to login again.  */
localStorage.clear();
