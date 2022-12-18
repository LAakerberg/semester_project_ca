const profileInfoData = document.querySelector('#insert-profile-image');
const profileData = document.querySelector('#insert-profile');

// Importing API link + fetch functions for async function
import { API_HOST_PROFILES } from '../auth/apiBase.js';
import { authFetch } from '../auth/authFetch.js';
import { headers } from '../auth/authFetch.js';
import { errorMessage } from '../../components/message.js';

profileInfoData.innerHTML += ``;
profileData.innerHTML += ``;

const method = 'GET';

const profileIdentify = localStorage.getItem('myName');
//const profileEmail = localStorage.getItem('myEmail');

const searchModal = document.querySelector('#search-container');
const searchOpen = document.querySelector('#search-button');

export function searchButton() {
  searchOpen.onclick = function () {
    searchModal.style.display = 'none';
  };

  searchOpen.onclick = function () {
    searchModal.style.display = 'block';
  };
}

export function getProfileInfo() {
  async function getProfile(url) {
    try {
      const response = await authFetch(
        url,
        {
          method,
        },
        headers()
      );

      const json = await response.json(API_HOST_PROFILES);
      const profileInfo = json;

      if (response.ok === true) {
        profileInfoData.innerHTML += `
      
        <div class="m-auto"><img id="profile-avatar" src="${profileInfo.avatar}" alt="" style="width: 200px; height: 200px; border-radius: 100%; object-fit: cover;" style="border-radius: 30px;"></div>
        
        `;

        profileData.innerHTML += `
        
        <div id="profile-name" class="m-auto border w-10/12 border-orange-400 rounded-lg p-2 uppercase">${profileInfo.name}</div>
        <div id="profile-credit" class="m-auto border w-10/12 border-orange-400 rounded-lg p-2 uppercase">Coins:  <span class="text-xl">${profileInfo.credits}</span></div>
        
        `;
      } else {
        profileInfoData.innerHTML += errorMessage(
          `Not able to collect the information! Try to log out & in again! <p>Error: ${profileInfo.errors[0].code}</p>`
        );
        profileData.innerHTML += `
          <button class="btn-secondary mr-1" id="loginBtn"><a href="/index.html">Log in</a></button>
          <button class="btn-primary mr-1" id="registerBtn"><a href="/index.html">Sign UP</a></button> 
          `;
      }

      console.log(profileInfo);
    } catch (error) {
      console.log('Error loading the auction house listings');
      console.log('Hello?');
    }
  }

  getProfile(`${API_HOST_PROFILES}${profileIdentify}?_listings=true`);
}
