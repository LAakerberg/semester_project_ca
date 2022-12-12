const auctionListings = document.querySelector('#auction-list');

// Importing API link + fetch functions for async function
import { API_HOST_LISTINGS } from '../auth/apiBase.js';
import { authFetch } from '../auth/authFetch.js';
import { headers } from '../auth/authFetch.js';

const method = 'GET';

auctionListings.innerHTML = ``;

export async function getListings(url) {
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

    const dateRequested = new Date(`${listingsResults[0].created}`);
    // Formats the date from the request to be more user friendly and readable
    const dateFormatted = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
    const newFormat = dateRequested.toLocaleDateString('en-GB', dateFormatted);

    /*     if (response.ok === true) {
      console.log('True');
    } */

    for (let i = 0; i < listingsResults.length; i++) {
      if (response.ok === true) {
        const listingsID = listingsResults[i].id;
        const listingsTitle = listingsResults[i].title.slice(0, 20);
        const listingsMedia = listingsResults[i].media[0];
        const listingsCreated = listingsResults[i].created;

        auctionListings.innerHTML += `
        <!-- Product card -->
        <div
          class="bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-lg w-44 h-48 shadow-lg hover:shadow-slate-400/50"
        >
          <div class="h-4/6 border-b-2 border-slate-500">
            <img
              src="${listingsMedia}"
              class="img-style rounded-t-lg w-44 h-32"
            />
          </div>
          <div class="p-1">${listingsTitle}</div>
          <div class="p-1">${newFormat}</div>
        </div>
        <!-- Product card END -->
        `;
      }
    }
  } catch (error) {
    console.log('Error loading the auction house listings');
    console.log('Hello?');
  }
}

getListings(API_HOST_LISTINGS);
