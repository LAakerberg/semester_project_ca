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
    const listingsID = listingsResults[0].id;
    const listingsTitle = listingsResults[0].title;
    const listingsCreated = listingsResults[0].created;

    console.log(listingsResults);
    console.log('Hello?');

    auctionListings.innerHTML = `
    <!-- Product card -->
    <div
      class="bg-slate-600 border border-slate-500 rounded-lg w-44 h-48"
    >
      <div class="h-4/6 border-b-2 border-slate-500">
        <img
          src="/assets/img/head-img.jpg"
          class="img-style rounded-t-lg p-1"
        />
      </div>
      <div class="p-1">${listingsID}</div>
      <div class="p-1">${listingsTitle}</div>
      <div class="p-1">${listingsCreated}</div>
    </div>
    <!-- Product card END -->
    `;
  } catch (error) {
    console.log('Error loading the auction house listings');
    console.log('Hello?');
  }
}

getListings(API_HOST_LISTINGS);
