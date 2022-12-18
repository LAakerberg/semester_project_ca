// Message if register is successful or disbanded
const registerMessage = document.querySelector('#register-message');

// Login form selectors
const newListForm = document.querySelector('#newlist-form');
const newTitle = document.querySelector('#new-title');
const newTag = document.querySelector('#new-tag');
const newUrl = document.querySelector('#new-url');
const newDateTime = document.querySelector('#new-date');
const newDescription = document.querySelector('#new-description');

import { API_HOST_LISTINGS } from '../../auth/apiBase.js';
import { authFetch } from '../../auth/authFetch.js';
import { headers } from '../../auth/authFetch.js';
import { errorMessage, successMessage } from '../../../components/message.js';

export function newPostList() {
  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newListValue = {
      title: newTitle.value,
      tag: newTag.value,
      url: newUrl.value,
      endsAt: newDateTime.value,
      description: newDescription.value,
    };

    console.log(newListValue);

    async function postList(url) {
      const method = 'POST';
      try {
        const response = await authFetch(
          url,
          {
            method,
            body: JSON.stringify(newListValue),
          },
          headers()
        );

        const json = await response.json(API_HOST_LISTINGS);
        //const errorLog = json.errors[0].message;
        console.log(json);

        if (response.ok === true) {
          registerMessage.innerHTML = successMessage(
            'Registration was successful, you will be redirected'
          );
          //redirect(response);
        } else {
          registerMessage.innerHTML = errorMessage('Not able to register user');
        }
      } catch (error) {
        console.log(error);
      }
    }
    postList(API_HOST_LISTINGS);
  });
}

newPostList();
