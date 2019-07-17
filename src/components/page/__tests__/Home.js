import React from 'react';
import { render, waitForElementToBeRemoved } from 'utils/testUtil';
import Home from 'components/page/Home';

const movie = {
  id: '1234',
  title: 'Test title',
  backdrop_path: 'https://via.placeholder.com/500x281',
  overview: 'Test overview',
  vote_average: 4,
  vote_count: 100
};

beforeEach(() => {
  jest.spyOn(window, 'fetch');
});

it('renders no data when no data is found', async () => {
  const history = jest.fn();
  const props = { history };

  const mockSuccessResponse = {
    page: 1,
    results: [],
    total_results: 0
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  window.fetch = jest.fn(() => mockFetchPromise);

  const { container, getByText } = render(<Home {...props} />);
  await waitForElementToBeRemoved(() =>
    container.querySelector('.ant-spin')
  );
  expect(getByText(new RegExp('We could not find any movie with given search text'))).toBeInTheDocument();
});

it('renders movie list', async () => {
  const history = jest.fn();
  const props = { history };

  const mockSuccessResponse = {
    page: 1,
    results: new Array(3).fill(movie),
    total_results: 0
  };
  const mockJsonPromise = Promise.resolve(mockSuccessResponse);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  window.fetch = jest.fn(() => mockFetchPromise);

  const { container, queryAllByTestId } = render(<Home {...props} />);
  await waitForElementToBeRemoved(() =>
    container.querySelector('.ant-spin')
  );
  expect(queryAllByTestId('movie-card')).toHaveLength(3);
});
