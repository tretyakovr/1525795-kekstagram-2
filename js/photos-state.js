import { getUniqueRandomNumbers } from './utils';

let loadedPhotos = {};
const RANDOM_COUNT = 10;


export function saveLoadedPhotos(photos) {
  console.log('saveloadedphotos', photos);
  loadedPhotos = photos;
}


export function getLoadedPhotos() {
  console.log('getloadedphotos', loadedPhotos);
  return loadedPhotos;
}


export function getDefaultPhotos() {
  return loadedPhotos;
}


export function getRandomPhotos(countPhotos = RANDOM_COUNT) {
  const randomIds = getUniqueRandomNumbers(0, loadedPhotos.length - 1, countPhotos)();
  const randomPhotos = [];

  for (let i = 0; i < randomIds.length; i++) {
    randomPhotos.push(loadedPhotos[randomIds[i]]);
  }

  return randomPhotos;
}
