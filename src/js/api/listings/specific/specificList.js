let title = document.querySelector('title');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

// Imports

import { API_HOST_LISTINGS } from '../../auth/apiBase.js';
import { authFetch } from '../../auth/authFetch.js';
import { headers } from '../../auth/authFetch.js';
import { allBids } from './bids/bids.js';

//const
const method = 'GET';
const specificTitle = document.querySelector('#list-title');
const specificDescription = document.querySelector('#list-description');
const specificTags = document.querySelector('#list-tags');
const specificImg = document.querySelector('#list-images');
const specificBids = document.querySelector('#list-bids');
const imageGallery = document.querySelector('#list-gallery');
const sliderForBids = document.querySelector('#sliderBid');
const sliderValue = document.querySelector('#sliderBidValue');

async function getSpecificList(url) {
  try {
    const response = await authFetch(
      url,
      {
        method,
      },
      headers()
    );

    const json = await response.json(API_HOST_LISTINGS);
    const specificResults = json;

    if (response.ok === true)
      // Insert the first image in the array

      specificImg.innerHTML += `
      
      <div class="bg-slate-700 outline outline-1 outline-slate-500 rounded-md h-48 items-center">
        <img
          src="${specificResults.media[0]}"
          id="profileImg"
          class="rounded-md w-64 h-48"
        />
      </div>`;
    specificTitle.innerHTML += `${specificResults.title}`;
    specificDescription.innerHTML += `<p>${specificResults.description}</p>`;
    specificTags.innerHTML = `<span>Tags:</span> `;

    // For loop for collect all the registered media/images

    for (let i = 1; i < specificResults.media.length; i++) {
      const mediaGallery = specificResults.media[i];
      console.log(mediaGallery);

      imageGallery.innerHTML += `
        <img src="${mediaGallery}" id="galleryImg" class="rounded-md outline outline-1 outline-slate-500" />
        `;
    }

    // For loop for collect all the registered tags

    for (let i = 0; i < specificResults.tags.length; i++) {
      const specTags = specificResults.tags[i];
      specificTags.innerHTML += `${specTags}, `;
    }

    sliderValue.innerHTML = sliderForBids.value;

    sliderForBids.oninput = function () {
      sliderValue.innerHTML = this.value;
    };

    // Show all active bids on the product

    for (let i = 0; i < specificResults.bids.length; i++) {
      const specBidsEmpty = specificResults.bids[0];
      const specBids = specificResults.bids[i];
      const specBidsAmount = specificResults.bids[i].amount;

      console.log(specBids);
      specificBids.innerHTML += `
      
      <!-- Product card -->
      <div
        class="bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-lg w-32 h-20 shadow-lg hover:shadow-slate-400/50">
          <div class="p-1">Bid by: ${specBids.bidderName}</div>
          <div class="p-1">Amount: ${specBidsAmount}</div>
      </div>
      <!-- Product card END -->
      
      `;
    }

    /*         for (let i = 0; i < specificResults.bids.length; i++) {
      const specBids = specificResults.bids[i];
      specificBids.innerHTML += `
      
      <!-- Product card -->
      <div
        class="bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-lg w-auto w-32 h-20 shadow-lg hover:shadow-slate-400/50">
          <div class="p-1">Bid by: ${specBids.bidderName}</div>
          <div class="p-1">Amount: ${specBids.amount}</div>
      </div>
      <!-- Product card END -->
      
      `;
    } */

    console.log(response);
    console.log(specificResults);
  } catch (error) {
    console.log('Error loading the auction house listings');
    console.log('Hello?');
  }
}

getSpecificList(
  `${API_HOST_LISTINGS}${id}?_seller=true&_bids=true&_active=true`
);
