import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMore,
  hideLoadMore,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('.form');
const input = form.querySelector('input[name="search-text"]');
const loadMore = document.querySelector('.load-more');
let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (input.value.trim() === '') {
    iziToast.error({ title: 'Error', message: 'Please enter a search query' });
    return;
  }
  currentQuery = input.value.trim();
  currentPage = 1;
  clearGallery();
  hideLoadMore();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there is not result',
      });
      return;
    }
    createGallery(data.hits);
    input.value = '';
    if (totalHits > currentPage * PER_PAGE) {
      showLoadMore();
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results",
      });
      hideLoadMore();
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there is a problem',
    });
  } finally {
    hideLoader();
  }
});
loadMore.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there is not result',
      });
      return;
    }
    createGallery(data.hits);
    if (totalHits <= currentPage * PER_PAGE) {
      hideLoadMore();
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results",
      });
    } else {
      showLoadMore();
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Sorry, there is a problem',
    });
  } finally {
    hideLoader();
  }
  const { height: cardHeight } = document
    .querySelector('.gallery .photo-card')
    .getBoundingClientRect();
  window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
});
