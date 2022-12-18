// Message if register is successful or disbanded
const registerMessage = document.querySelector('#register-message');

import { renderList } from './renderList';
import { errorMessage } from '../../components/message.js';

export function searchList(lists) {
  const search = document.querySelector('#search-function');
  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredList = lists.filter(function (list) {
      if (list.title.toLowerCase().startsWith(searchValue)) {
        return true;
      }
    });
    console.log(filteredList);

    renderList(filteredList);
  };
}
