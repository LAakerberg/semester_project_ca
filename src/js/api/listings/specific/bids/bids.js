const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get('id');

// Message if register is successful or disbanded
const registerMessage = document.querySelector('#register-message');

// Login form selectors
const bidForm = document.querySelector('#bid-form');
const bidValue = document.querySelector('#sliderBid');
//const bidRegister = document.querySelector('#sliderBid');

import { API_HOST_LISTINGS } from '../../../auth/apiBase.js';
import { authFetch } from '../../../auth/authFetch.js';
import { headers } from '../../../auth/authFetch.js';
import {
  errorMessage,
  successMessage,
} from '../../../../components/message.js';

export function newBid() {
  bidForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const bidAmountValue = {
      amount: parseFloat(bidValue.value),
    };

    console.log(bidValue.value);
    console.log(bidAmountValue);

    async function newBidRequest(url) {
      const method = 'POST';
      try {
        const response = await authFetch(
          url,
          {
            method,
            body: JSON.stringify(bidAmountValue),
          },
          headers()
        );

        const json = await response.json(API_HOST_LISTINGS);
        //const errorLog = json.errors[0].message;
        console.log(response);
        console.log(json);

        if (response.ok === true) {
          registerMessage.innerHTML = successMessage(
            'Bid was successful, you will be redirected'
          );
          //redirect(response);
        } else {
          const errorLog = json.errors[0].code;
          registerMessage.innerHTML = errorMessage(
            `Error, you are not logged in! ${errorLog}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    newBidRequest(API_HOST_LISTINGS + id + '/bids');
  });
}
