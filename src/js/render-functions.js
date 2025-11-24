import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const galleryUl = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
export function createGallery(images) {
  galleryUl.innerHTML = images
    .map(
      img => `
      <li class="photo-card">
        <a class="link" href="${img.largeImageURL}">
          <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="text">Likes</br> ${img.likes}</p>
          <p class="text">Views</br> ${img.views}</p>
          <p class="text">Comments</br> ${img.comments}</p>
          <p class="text">Downloads</br> ${img.downloads}</p>
        </div>
      </li>
    `
    )
    .join('');
  lightbox.refresh();
}

export function clearGallery() {
  galleryUl.innerHTML = '';
}
export function showLoader() {
  loader.classList.remove('hidden');
}
export function hideLoader() {
  loader.classList.add('hidden');
}
