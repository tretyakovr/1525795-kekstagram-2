import { getData } from './exchange';
import { getDefaultPhotos, getRandomPhotos, getDiscussedPhotos } from './photos-state';

const sectionFilters = document.querySelector('.img-filters');
const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');


sectionFilters.classList.remove('img-filters--inactive');
filterDefault.addEventListener('click', renderDefaultPhotos);
filterRandom.addEventListener('click', renderRandomPhotos);
filterDiscussed.addEventListener('click', renderDiscussedPhotos);


renderDefaultPhotos();


function renderDefaultPhotos() {
  filterDefault.classList.add('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');

  getData(getDefaultPhotos);
}


function renderRandomPhotos() {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.add('img-filters__button--active');
  filterDiscussed.classList.remove('img-filters__button--active');

  getData(getRandomPhotos);
}


function renderDiscussedPhotos() {
  filterDefault.classList.remove('img-filters__button--active');
  filterRandom.classList.remove('img-filters__button--active');
  filterDiscussed.classList.add('img-filters__button--active');

  getData(getDiscussedPhotos);
}

