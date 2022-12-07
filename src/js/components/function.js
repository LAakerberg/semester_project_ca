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
