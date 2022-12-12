let title = document.querySelector('title');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');
