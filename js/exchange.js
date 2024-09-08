// import { showThumbnail } from './show-photos';
// import { showPhotoFilters } from './photo-filters';
import { showErrMessage, showSuccessMessage } from './alerts';
import { saveLoadedPhotos } from './photos-state';
const GET_ENDPOINT = 'https://31.javascript.htmlacademy.pro/kekstagram/data';
const POST_ENDPOINT = 'https://31.javascript.htmlacademy.pro/kekstagram';
const submitButton = document.querySelector('#upload-submit');


async function getData () {
  const response = await fetch(GET_ENDPOINT);
  const data = await response.json();

  return data;
}
    // .then((response) => {
    //   if (!response.ok) {
    //     throw new Error(); // Некорректный ответ сервера!
    //   }
    //   return response.json();
    // })
    // .catch((err) => {
    //   showErrMessage(err.message); // Ошибка соединения с сервером!
    // })
  // }


const enableSubmit = () => {
  submitButton.disabled = false;
};


const sendData = (formData) =>
  fetch(POST_ENDPOINT, {method: 'POST', body: formData})
    .then((response) => {
      if (!response.ok) {
        throw new Error(); // Некорректный ответ сервера
      }
    })
    .then(() => {
      showSuccessMessage();
    })
    .catch((err) => {
      showErrMessage(err.message); // Ошибка соединения с сервером
    })
    .finally(enableSubmit);


export const getDefaultPhotos = () => {
  const defaultPhotos = getData();

  return defaultPhotos;
};



export { getData, sendData };
