// Message if register is successful or disbanded
const registerMessage = document.querySelector('#register-message');

// Importing API link + fetch functions for async function
import { API_HOST_LISTINGS } from '../auth/apiBase.js';
import { authFetch } from '../auth/authFetch.js';
import { headers } from '../auth/authFetch.js';
import { errorMessage, successMessage } from '../../components/message.js';
import { renderList } from './renderList.js';
import { searchList } from './searchList.js';
//import { correctDate } from '../auth/authFetch.js';

const menuOpenModal = document.querySelector('#hamburgMenu');
const openMenuBtn = document.querySelector('#openMenu');
const closeMenuBtn = document.querySelector('#closeMenu');

export function openMenu() {
  openMenuBtn.onclick = function () {
    menuOpenModal.style.display = 'block';
  };

  closeMenuBtn.onclick = function () {
    menuOpenModal.style.display = 'none';
  };
}

openMenu();

const method = 'GET';

//auctionListings.innerHTML = ``;

export function requestListings() {
  async function getListings(url) {
    try {
      const response = await authFetch(
        url,
        {
          method,
        },
        headers()
      );

      const json = await response.json(API_HOST_LISTINGS);
      const listingsResults = json;
      const listToRender = json;

      renderList(listToRender);
      searchList(listToRender);
      console.log(response);
      console.log(listingsResults);

      /*       for (let i = 0; i < listingsResults.length; i++) {
        if (response.ok === true) {
          console.log(response.ok);
        } else {
          const errorLog = json.errors[0].message;
          registerMessage.innerHTML = errorMessage(`Error!! ${errorLog}`);
          console.log(listingsResults.errors[0].message);
        }
      } */
    } catch (error) {
      console.log(error);
      registerMessage.innerHTML = errorMessage(`Error!! ${error}`);
    }
  }

  getListings(`${API_HOST_LISTINGS}?_bids=true&_active=true&limit=50`);
}
