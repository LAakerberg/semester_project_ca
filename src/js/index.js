console.log('Intentional Syntax Error...');

const modal = document.querySelector('#loginModal');
const btn = document.querySelector('#loginBtn');
const btnClose = document.querySelector('#close');

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
