const profileInsert = document.querySelector('#profile');
const activeListings = document.querySelector('#active-list');
const profileImage = document.querySelector('#profileImage');
const profileData = document.querySelector('#profile-info');
const editProfileForm = document.querySelector('#editProfile');

// Importing API link + fetch functions for async function
import { API_HOST_PROFILES } from '../auth/apiBase.js';
import { authFetch } from '../auth/authFetch.js';
import { headers } from '../auth/authFetch.js';
import { editProfile } from './edit/editProfile.js';
import { errorMessage, successMessage } from '../../components/message.js';

const method = 'GET';

//profileInsert.innerHTML = ``;
activeListings.innerHTML = ``;

const profileIdentify = localStorage.getItem('myName');
const profileEmail = localStorage.getItem('myEmail');

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

export function requestProfile() {
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

      console.log(profileInfo);

      editProfile();

      if (response.ok === true && profileEmail === profileInfo.email) {
        const profileName = profileInfo.name;
        const profileEmail = profileInfo.email;
        const profileCredit = profileInfo.credits;
        const profileAvatar = profileInfo.avatar;
        const profileWins = profileInfo.wins.length;
        const profileCount = profileInfo._count.listings;

        profileImage.innerHTML += `<img src="${profileAvatar}" id="profileImg" class="rounded-md" />`;
        profileData.innerHTML += `
        
        <span>Username:</span>
      ${profileName}
        <div>
          <ul>
            <li><span>Email:</span> ${profileEmail}</li>
            <li><span>Credit:</span> ${profileCredit}</li>
            <li><span>Wins:</span> ${profileWins}</li>
            <li><span>Count:</span> ${profileCount}</li>
          </ul>
        </div>
        
        `;

        for (let i = 0; i < profileInfo.listings.length; i++) {
          const dateRequested = new Date(`${profileInfo.listings[i].endsAt}`);
          // Formats the date from the request to be more user friendly and readable
          const dateFormatted = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
          };
          const newFormat = dateRequested.toLocaleDateString(
            'en-GB',
            dateFormatted
          );

          activeListings.innerHTML += `
        <!-- Product card -->
        <a href="/pages/listings/specific/?id=${profileInfo.listings[i].id}"/>
        <div
          class="bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-lg w-44 h-48 shadow-lg hover:shadow-slate-400/50"
        >
          <div class="h-4/6 border-b-2 border-slate-500">
            <img
              src="${profileInfo.listings[i].media[0]}"
              class="img-style rounded-t-lg p-1"
            />
          </div>
          <div class="p-1">${profileInfo.listings[i].title.slice(0, 22)}</div>
          <div class="p-1">Ends: ${newFormat}</div>
        </div>
        </a>
        <!-- Product card END -->
        `;
        }
      } else {
        profileData.innerHTML = errorMessage(
          'Not able to collect the information! Try to log out & in again!'
        );
      }
    } catch (error) {
      console.log('Error loading the auction house listings');
      console.log('Hello?');
    }
  }

  getProfile(`${API_HOST_PROFILES}${profileIdentify}?_listings=true`);
}
