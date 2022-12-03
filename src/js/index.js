console.log('Intentional Syntax Error...');

const signUpModal = document.querySelector('#signupModal');
const signUpBtn = document.querySelector('#registerBtn');
const signUpBtnClose = document.querySelector('#signup-close');
const modal = document.querySelector('#loginModal');
const btn = document.querySelector('#loginBtn');
const btnClose = document.querySelector('#close');

signUpBtn.onclick = function () {
  signUpModal.style.display = 'block';
};

signUpBtnClose.onclick = function () {
  signUpModal.style.display = 'none';
};

btn.onclick = function () {
  modal.style.display = 'block';
};

btnClose.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

console.log(' Internal ERROR ');
