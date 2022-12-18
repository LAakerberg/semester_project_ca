let title = document.querySelector('title');
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

// Message if register is successful or disbanded
const registerMessage = document.querySelector('#register-message');

// Imports

import { API_HOST_LISTINGS } from '../../auth/apiBase.js';
import { authFetch } from '../../auth/authFetch.js';
import { headers } from '../../auth/authFetch.js';
import { errorMessage } from '../../../components/message.js';

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
const highestBid = document.querySelector('#highest-bid');

export function specificList() {
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
        if (
          specificResults.media[0] === undefined ||
          specificResults.media[0] === ''
        ) {
          /* Insert the first image in the array
      if the image is missing or undefined, add an none-image */

          specificResults.media[0] =
            'https://static.thenounproject.com/png/2884221-200.png';
        }
      specificImg.innerHTML += `
      
      <div class="bg-slate-700 outline outline-1 outline-slate-500 rounded-md items-center">
        <img
          src="${specificResults.media[0]}"
          id="profileImg"
          class="rounded-md"
        />
      </div>`;
      specificTitle.innerHTML += `${specificResults.title}`;
      specificDescription.innerHTML += `<p>${specificResults.description}</p>`;
      specificTags.innerHTML = `<span>Tags:</span> `;

      // For loop for collect all the registered media/images

      for (let i = 1; i < specificResults.media.length; i++) {
        const mediaGallery = specificResults.media[i];

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
        console.log(specificResults);
        const dateRequested = new Date(`${specificResults.bids[i].created}`);
        const dateEndRequested = new Date(`${specificResults.endsAt}`);
        // Formats the date from the request to be more user friendly and readable
        const dateFormatted = {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        };
        const specBidsCreated = dateRequested.toLocaleDateString(
          'en-GB',
          dateFormatted
        );
        const deadline = dateEndRequested.toLocaleDateString(
          'en-GB',
          dateFormatted
        );

        console.log(deadline);

        const specBids = specificResults.bids;
        //const deadline = specificResults.endsAt;

        specBids.sort((a, b) => a.amount - b.amount);
        specBids.reverse((a, b) => a.amount - b.amount);
        highestBid.innerHTML = `

      <div class="flex flex-col w-40 mobile:w-auto gap-1">
      <div class="flex-1 min-w-max">Highest bid by:</div>
        <div class="flex flex-rows gap-2 grow">
          <div class="flex-shrink min-w-max">${specBids[0].bidderName}</div>
          <div class="flex-shrink w-16 border rounded border-orange-400 px-3 text-center">${specBids[0].amount}</div>
        </div>
        <div class="flex-auto">Deadline: <span class="text-lg underline underline-offset-4">${deadline}</span></div>
    </div>
      
      `;

        specificBids.innerHTML += `
    
    <!-- Product card -->
    <div
    class="flex flex-col min-w-max divide-y divide-dashed gap-1 p-2 bg-slate-600 outline outline-1 hover:outline-2 outline-slate-500 rounded-sm w-auto shadow-lg hover:shadow-slate-400/50"
  >
    <div class="flex flex-col w-40 mobile:w-auto mobile:flex-row gap-1">
      <div class="flex-1 min-w-max">${specBids[i].bidderName}</div>
      <div class="flex-shrink-1 w-16 border rounded border-orange-400 px-3 text-center">${specBids[i].amount}</div>
      <div class="flex-shrink-1 min-w-max">${specBidsCreated}</div>
    </div>
  </div>
    <!-- Product card END -->
    
    `;
      }
    } catch (error) {
      console.log(error);
      console.log(error);
      registerMessage.innerHTML = errorMessage(`Error!! ${error}`);
    }
  }

  getSpecificList(
    `${API_HOST_LISTINGS}${id}?_seller=true&_bids=true&_active=true`
  );
}
