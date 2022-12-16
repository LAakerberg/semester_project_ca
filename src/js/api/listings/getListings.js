const auctionListings = document.querySelector('#auction-list');

// Importing API link + fetch functions for async function
import { API_HOST_LISTINGS } from '../auth/apiBase.js';
import { authFetch } from '../auth/authFetch.js';
import { headers } from '../auth/authFetch.js';
//import { correctDate } from '../auth/authFetch.js';

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

      console.log(response);
      console.log(listingsResults);

      for (let i = 0; i < listingsResults.length; i++) {
        if (response.ok === true) {
          const dateRequested = new Date(`${listingsResults[i].endsAt}`);
          // Formats the date from the request to be more user friendly and readable
          const dateFormatted = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };
          const newFormat = dateRequested.toLocaleDateString(
            'en-GB',
            dateFormatted
          );

          //const dateTime = correctDate(listingsResults[i].endsAt);

          const listingsTitle = listingsResults[i].title.slice(0, 20);
          const listingsMedia = listingsResults[i].media[0];
          const listings = listingsResults[i].id;
          //const listingsBids = listingsResults[i].bids[0].amount;
          //const listingsCreated = listingsResults[i].created;
          const listingsEnd = newFormat;

          auctionListings.innerHTML += `
        <!-- Product card -->
        <a href="/pages/listings/specific/?id=${listings}"/>
        <div
          class="bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-lg w-44 shadow-lg hover:shadow-slate-400/50"
        >
          <div class="h-4/6 border-b-2 border-slate-500">
            <img
              src="${listingsMedia}"
              class="img-style rounded-t-lg w-44 h-32"
            />
          </div>
          <div class="p-1">${listingsTitle}</div>
          <div class="p-1">Ends: ${listingsEnd}</div>
        </div>
        </a>
        <!-- Product card END -->
        `;
        }
      }
    } catch (error) {
      console.log('Error loading the auction house listings');
      console.log('Hello?');
    }
  }

  getListings(`${API_HOST_LISTINGS}?_bids=true&_active=true`);
}
