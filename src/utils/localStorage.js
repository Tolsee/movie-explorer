// @flow
const FAVORITE_MOVIES_KEY = 'favorite_movies';
const WATCH_LATER_MOVIES_KEY = 'watch_later_movies';

function getArray(key: string) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function addToStorageSet(key: string, value: string) {
  const existingArray = JSON.parse(localStorage.getItem(key)) || [];
  const newArray = [...(new Set([...existingArray, value]))];
  localStorage.setItem(key, JSON.stringify(newArray));
}

function removeFromStorageSet(key: string, value: string) {
  const existingArray = JSON.parse(localStorage.getItem(key)) || [];
  const newArray = existingArray.filter(element => element !== value);
  localStorage.setItem(FAVORITE_MOVIES_KEY, JSON.stringify(newArray));
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

export function checkFavorite(id) {
  const existingArray = JSON.parse(localStorage.getItem(FAVORITE_MOVIES_KEY)) || [];
  return !!existingArray.find(element => element === id);
}

export function checkWatchLater(id) {
  const existingArray = JSON.parse(localStorage.getItem(WATCH_LATER_MOVIES_KEY)) || [];
  return !!existingArray.find(element => element === id);
}

export function getFavoriteMovies() {
  return getArray(FAVORITE_MOVIES_KEY);
}

export function getWatchLaterMovies() {
  return getArray(WATCH_LATER_MOVIES_KEY);
}
