const profileInsert = document.querySelector('#profile');
const activeListings = document.querySelector('#active-list');

// Importing API link + fetch functions for async function
import { API_HOST_PROFILES } from '../auth/apiBase.js';
import { authFetch } from '../auth/authFetch.js';
import { headers } from '../auth/authFetch.js';

const method = 'GET';

profileInsert.innerHTML = ``;
activeListings.innerHTML = ``;

const profileIdentify = localStorage.getItem('myName');
const profileEmail = localStorage.getItem('myEmail');

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

      if (response.ok === true && profileEmail === profileInfo.email) {
        const profileName = profileInfo.name;
        const profileEmail = profileInfo.email;
        const profileCredit = profileInfo.credits;
        const profileAvatar = profileInfo.avatar;
        const profileWins = profileInfo.wins.length;
        const profileCount = profileInfo._count.listings;

        profileInsert.innerHTML += `
        <!-- Profile card -->
        <div class="flex-shrink w-64">
        <div
          class="bg-slate-700 outline outline-1 outline-slate-500 rounded-md h-48"
        >
          <img src="${profileAvatar}" id="profileImg" class="rounded-md h-48" />
        </div>
      </div>
      <div class="flex-1"><span>Username:</span>
      ${profileName}
        <div>
          <ul>
            <li><span>Email:</span> ${profileEmail}</li>
            <li><span>Credit:</span> ${profileCredit}</li>
            <li><span>Wins:</span> ${profileWins}</li>
            <li><span>Count:</span> ${profileCount}</li>
          </ul>
        </div>
      </div>
      <div class="flex-grow-0">
      <ul>
        <li>Add new listings</li>
        <li>Edit profile</li>
      </ul>
      </div>
        <!-- Profile card END -->
        `;

        for (let i = 0; i < profileInfo.listings.length; i++) {
          const dateRequested = new Date(`${profileInfo.listings[0].endsAt}`);
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
          <div class="p-1">${profileInfo.listings[i].title.slice(0, 27)}</div>
          <div class="p-1">Ends: ${newFormat}</div>
        </div>
        </a>
        <!-- Product card END -->
        `;
        }
      } else {
        console.log('No match');
      }
    } catch (error) {
      console.log('Error loading the auction house listings');
      console.log('Hello?');
    }
  }

  getProfile(`${API_HOST_PROFILES}${profileIdentify}?_listings=true`);
}
