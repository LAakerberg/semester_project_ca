const profileIdentify = localStorage.getItem('myName');
const editProfileForm = document.querySelector('#editProfile');

// Open the login form/modal
const signUpModal = document.querySelector('#editProfileModal');
const signUpBtn = document.querySelector('#openEditModal');
const signUpBtnClose = document.querySelector('#closeEditModal');

const method = 'GET';

import { API_HOST_PROFILES } from '../../auth/apiBase.js';
import { authFetch } from '../../auth/authFetch.js';
import { headers } from '../../auth/authFetch.js';
import { reloadPage } from '../../../components/function.js';

export function editProfile() {
  signUpBtn.onclick = function () {
    signUpModal.style.display = 'block';
  };

  signUpBtnClose.onclick = function () {
    signUpModal.style.display = 'none';
  };
}

export async function collectProfileData(url) {
  try {
    const response = await authFetch(
      url,
      {
        method,
      },
      headers()
    );

    const json = await response.json();
    const profileInfoData = json;

    // Collect the existing information and add it to the form
    editProfileForm.name.value = profileInfoData.name;
    editProfileForm.email.value = profileInfoData.email;
    editProfileForm.avatar.value = profileInfoData.avatar;

    /*     const insertProfileData = {
      name: editProfileForm.name.value,
      email: editProfileForm.email.value,
      avatar: editProfileForm.avatar.value,
    };

    console.log(insertProfileData); */
  } catch (error) {
    console.log(error);
  }
}

collectProfileData(API_HOST_PROFILES + profileIdentify);

/**
 * This is addEventListener will update the post when the Update button is clicked.
 */
editProfileForm.addEventListener(`submit`, (e) => {
  e.preventDefault();

  const editProfileData = {
    avatar: editProfileForm.avatar.value,
  };

  /**
   * This will send the new information from the update form when the user
   * is updating the post with new values
   * @param {*} API_SOCIAL_URL insert the API link
   * @returns The new values in the form will be updated
   */
  async function updateProfileData(url) {
    try {
      //const method = 'PUT';
      const response = await authFetch(
        url,
        {
          method,
          body: JSON.stringify(editProfileData),
        },
        headers()
      );

      const json = await response.json(API_HOST_PROFILES);
      const profileInfoData = json;

      console.log(response);
      console.log(profileInfoData);
      if (response.ok === true) {
        reloadPage(response);
      } else {
        alert('An error have occurred, try again');
      }
      return json;
    } catch (error) {
      console.log(error);
      alert('An error have occurred, try again');
    }
  }

  updateProfileData(API_HOST_PROFILES + profileIdentify + '/media');
});
