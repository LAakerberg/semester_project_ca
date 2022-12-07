/**
 * This is a functions that's will send a more user friendly error message if the API or other process
 * is not working.
 * @param {*} message Trigger an default message if there is no message inserted in the catch/error.
 * @returns Return a user friendly error message about issues with the process.
 */
export function errorMessage(message = 'Unknown error have occurred!') {
  return `<div class="border border-error text-center p-2 px-4">${message}</div>`;
}

/**
 * This is a functions that's will send a more user friendly error message if the API or other process
 * is not working.
 * @param {*} message Trigger an default message if there is no message inserted in the catch/error.
 * @returns Return a user friendly error message about issues with the process.
 */
export function successMessage(message = 'Actions was successful!') {
  return `<div class="border border-success text-center p-2 px-4">${message}</div>`;
}

//<div class="success-card border border-success text-center p-2 px-4">Logged in is success, you will be redirected</div>
