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
import { redirectNewList } from '../../../components/function.js';

export function newPostList() {
  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newListValue = {
      title: newTitle.value,
      tag: [newTag.value],
      media: [newUrl.value],
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
            'New list was successful created, you will be redirected!'
          );
          redirectNewList(response);
          //redirect(response);
        } else {
          const errorLog = json.errors[0].message;
          registerMessage.innerHTML = errorMessage(`Error!! ${errorLog}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
    postList(API_HOST_LISTINGS);
  });
}

newPostList();
