// @flow
const FAVORITE_MOVIES_KEY = 'favorite_movies';
const WATCH_LATER_MOVIES_KEY = 'watch_later_movies';

function getArray(key: string) {
  // $FlowFixMe
  return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : [];
}

function addToStorageSet(key: string, value: string) {
  const existingArray = getArray(key);
  const newArray = [...(new Set([...existingArray, value]))];
  localStorage.setItem(key, JSON.stringify(newArray));
}

function removeFromStorageSet(key: string, value: string) {
  const existingArray = getArray(key);
  const newArray = existingArray.filter(element => element !== value);
  localStorage.setItem(key, JSON.stringify(newArray));
}

export function setFavoriteMovie(id: string) {
  addToStorageSet(FAVORITE_MOVIES_KEY, id);
}

export function setWatchLaterMovie(id: string) {
  addToStorageSet(WATCH_LATER_MOVIES_KEY, id);
}

export function removeFavoriteMovie(id: string) {
  removeFromStorageSet(FAVORITE_MOVIES_KEY, id);
}

export function removeWatchLaterMovie(id: string) {
  removeFromStorageSet(WATCH_LATER_MOVIES_KEY, id);
}

function checkIfExists(key: string, value: string) {
  const existingArray = getArray(key);
  return !!existingArray.find(element => element === value);
}

export function checkFavorite(id: string) {
  return checkIfExists(FAVORITE_MOVIES_KEY, id);
}

export function checkWatchLater(id: string) {
  return checkIfExists(WATCH_LATER_MOVIES_KEY, id);
}

export function getFavoriteMovies() {
  return getArray(FAVORITE_MOVIES_KEY);
}

export function getWatchLaterMovies() {
  return getArray(WATCH_LATER_MOVIES_KEY);
}
