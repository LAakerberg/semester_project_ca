// Global functions

/**
 * This is a redirection functions that's will be triggered on several other
 * functions just to redirect the user to another page if the operation was successful.
 * @param {boolean} response checks if the response is true or false
 * @returns the user will be redirected to the home/start page.
 */
export function redirect(response) {
  if (response.ok == true) {
    window.location.replace('/pages/');
  } else {
    //return errorMessage('');
  }
}

export function reloadPage(response) {
  if (response.ok == true) {
    window.location.reload();
  } else {
    //return errorMessage('');
  }
}

export function logOutUser() {
  const logOut = document.querySelector('#logout');

  logOut.onclick = function () {
    localStorage.clear();
    alert('You will now be logged out, welcome back!');
    setTimeout(() => {
      window.location.replace('/index.html');
    }, 2000);
  };
}

export function dateToHour(date) {
  const currentDate = new Date();
  const newDate = new Date(date);
  const timeSince = currentDate - newDate;
  const hours = Math.floor(timeSince / (1000 * 60 * 60));
  const minutes = Math.floor((timeSince / 1000 / 60) % 60);
  return `${hours}h ${minutes}m`;
}
