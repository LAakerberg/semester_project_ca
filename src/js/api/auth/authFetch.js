import { load } from '../storage/index.js';

export function headers() {
  const token = load('token');

  return {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export async function authFetch(url, option) {
  return fetch(url, {
    ...option,
    headers: headers(),
  });
}

/* export function correctDate(data) {
  const dateRequested = new Date(data);
  // Formats the date from the request to be more user friendly and readable
  const dateFormatted = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const newFormat = dateRequested.toLocaleDateString('en-GB', dateFormatted);
  console.log(newFormat);
} */
