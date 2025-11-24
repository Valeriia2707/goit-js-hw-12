import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
form.addEventListener('submit', e => {
  e.preventDefault();
  if (input.value.trim() === '') {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }
  showLoader();
  clearGallery();
  getImagesByQuery(input.value)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error',
          message: 'Sorry, there is not result',
        });
        return;
      }
      createGallery(data.hits);
      input.value = '';
    })
    .finally(() => {
      hideLoader();
    });
});
