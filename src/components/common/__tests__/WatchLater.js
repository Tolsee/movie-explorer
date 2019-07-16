import React from 'react'
import { render, fireEvent } from 'utils/testUtil';
import WatchLater from 'components/common/WatchLater';

it('renders Favorite component', () => {
  const id = '123';
  render(<WatchLater id={id} />);
});

it('stores movie in favorite list when already not on list', () => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');

  window.localStorage.__proto__.setItem = jest.fn();
  window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([]));

  const id = '123';
  const { container } = render(<WatchLater id={id} />);
  fireEvent(container.querySelector('button'), new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  expect(localStorage.setItem).toHaveBeenCalledWith('watch_later_movies', JSON.stringify([id]));
});

it('removes movie from favorite list when already on list', () => {
  const id = '123';
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');

  window.localStorage.__proto__.setItem = jest.fn();
  window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([id]));

  const { container } = render(<WatchLater id={id} />);
  fireEvent(container.querySelector('button'), new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  expect(localStorage.setItem).toHaveBeenCalledWith('watch_later_movies', JSON.stringify([]));
});
