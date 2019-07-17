import React from 'react';
import { render, waitForElementToBeRemoved } from 'utils/testUtil';
import List from 'components/page/List';

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, 'setItem');
  jest.spyOn(window.localStorage.__proto__, 'getItem');

  const mockSuccessResponse = {
    id: '1234',
    title: 'Test title',
    backdrop_path: 'https://via.placeholder.com/500x281',
    overview: 'Test overview',
    vote_average: 4,
    vote_count: 100
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  jest.spyOn(window, 'fetch');
  window.fetch = jest.fn(() => mockFetchPromise);
});

it('renders no data when list is empty', async () => {
  const history = jest.fn();
  const props = { history, match: { params: { listName: 'favorite' } } };

  window.localStorage.__proto__.setItem = jest.fn();
  window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify([]));

  const { container, getByText } = render(<List {...props} />);
  await waitForElementToBeRemoved(() =>
    container.querySelector('.ant-spin')
  );
  expect(getByText(new RegExp('There is no movies'))).toBeInTheDocument();
});

it('renders movie list', async () => {
  const history = jest.fn();
  const props = { history, match: { params: { listName: 'favorite' } } };

  window.localStorage.__proto__.setItem = jest.fn();
  window.localStorage.__proto__.getItem = jest.fn(() => JSON.stringify(['123', '12312']));

  const { container, queryAllByTestId } = render(<List {...props} />);
  await waitForElementToBeRemoved(() =>
    container.querySelector('.ant-spin')
  );
  expect(queryAllByTestId('movie-card')).toHaveLength(2);
});
