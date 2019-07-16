import {
  setFavoriteMovie,
  setWatchLaterMovie,
  removeFavoriteMovie,
  removeWatchLaterMovie,
  checkFavorite,
  checkWatchLater
} from 'utils/localStorage';

const FAVORITE_MOVIES_KEY = 'favorite_movies';
const WATCH_LATER_MOVIES_KEY = 'watch_later_movies';

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');
});

describe('setFavoriteMovie', () => {
  it('adds to favorite movies when not already on list', () => {
    const id = '123';

    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([]));

    setFavoriteMovie(id);

    expect(localStorage.setItem)
      .toHaveBeenCalledWith(FAVORITE_MOVIES_KEY, JSON.stringify([id]));
  });

  it('does not add to favorite movies when already on list', () => {
    const id = '123';

    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([id]));

    setFavoriteMovie(id);

    expect(localStorage.setItem)
      .toHaveBeenCalledWith(FAVORITE_MOVIES_KEY, JSON.stringify([id]));
  });
});

describe('setWatchLaterMovie', () => {
  it('adds to watch later movies when not already on list', () => {
    const id = '123';

    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([]));

    setWatchLaterMovie(id);

    expect(localStorage.setItem)
      .toHaveBeenCalledWith(WATCH_LATER_MOVIES_KEY, JSON.stringify([id]));
  });

  it('does not add to watch later movies when already on list', () => {
    const id = '123';

    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([id]));

    setWatchLaterMovie(id);

    expect(localStorage.setItem)
      .toHaveBeenCalledWith(WATCH_LATER_MOVIES_KEY, JSON.stringify([id]));
  });
});

describe('removeFavoriteMovie', () => {
  it('removes from favorite movies when already on list', () => {
    const id = '123';

    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([id]));

    removeFavoriteMovie(id);

    expect(localStorage.setItem)
      .toHaveBeenCalledWith(FAVORITE_MOVIES_KEY, JSON.stringify([]));
  });
});

describe('removeWatchLaterMovie', () => {
  it('removes from watch later movies when already on list', () => {
    const id = '123';

    window.localStorage.__proto__.setItem = jest.fn();
    window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([id]));

    removeWatchLaterMovie(id);

    expect(localStorage.setItem)
      .toHaveBeenCalledWith(WATCH_LATER_MOVIES_KEY, JSON.stringify([]));
  });
});

describe('checkFavorite', () => {
  it('return true if movie is in favorite movies list', () => {
    const id = '123';

    window.localStorage.__proto__.getItem = jest.fn(() =>
      JSON.stringify([id]));

    expect(checkFavorite(id)).toEqual(true);
  });

  it('return false if movie is not in favorite movies list', () => {
    const id = '123';

    window.localStorage.__proto__.getItem = jest.fn(() =>
      JSON.stringify([]));

    expect(checkFavorite(id)).toEqual(false);
  });
});

describe('removeWatchLaterMovie', () => {
  it('return true if movie is in watch later list', () => {
    const id = '123';

    window.localStorage.__proto__.getItem = jest.fn(() =>
      JSON.stringify([id]));

    expect(checkWatchLater(id)).toEqual(true);
  });

  it('return true if movie not in watch later list', () => {
    const id = '123';

    window.localStorage.__proto__.getItem = jest.fn(() =>
      JSON.stringify([]));

    expect(checkWatchLater(id)).toEqual(false);
  });
});
