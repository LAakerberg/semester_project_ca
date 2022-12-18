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

import { openMenu } from './api/listings/getListings.js';

openMenu();

import { searchButton } from './api/profile/profileInfo.js';

searchButton();

import { getProfileInfo } from './api/profile/profileInfo.js';
getProfileInfo();
