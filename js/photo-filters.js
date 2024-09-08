import { showThumbnail } from './show-photos';
import { getDefaultPhotos } from './exchange';
// import { getLoadedPhotos, getRandomPhotos } from './photos-state';
const sectionFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
// const RANDOM_COUNT = 10;


export function showFilteredPhotos() {
  sectionFilters.classList.remove('img-filters--inactive');
  filterDefault.addEventListener('click', renderDefaultPhotos);
  filterRandom.addEventListener('click', renderRandomPhotos);
  filterDiscussed.addEventListener('click', renderDiscussedPhotos);

  renderDefaultPhotos();
}


function renderDefaultPhotos() {
  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');

  const photos = await getDefaultPhotos();
  showThumbnail(photos);
}


function renderRandomPhotos() {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');

  // showThumbnail(getRandomPhotos());
}


function renderDiscussedPhotos() {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');
}

