import React from 'react';
import { render, waitForElementToBeRemoved } from 'utils/testUtil';
import Movie from 'components/page/Movie';

const movie = {
  id: '1234',
  title: 'Test title',
  backdrop_path: 'https://via.placeholder.com/500x281',
  overview: 'Test overview',
  vote_average: 4,
  vote_count: 100
};

function mockFetchResponse(response) {
  const mockJsonPromise = Promise.resolve(response);
  return Promise.resolve({
    json: () => mockJsonPromise,
  });
}

beforeEach(() => {
  jest.spyOn(window, 'fetch');
});

it('renders no data when no movie is found', async () => {
  const history = jest.fn();
  const props = { history, match: { params: { id: '123123' } } };

  const mockSuccessResponse = {
    status_code: 34
  };
  const mockFetchPromise = mockFetchResponse(mockSuccessResponse)

  window.fetch = jest.fn(() => mockFetchPromise);

  const { container, getByText } = render(<Movie {...props} />);
  await waitForElementToBeRemoved(() =>
    container.querySelector('.ant-spin')
  );
  expect(getByText(new RegExp('There is no movie'))).toBeInTheDocument();
});

it('renders infoCard and similar movies', async () => {
  const history = jest.fn();
  const props = { history, match: { params: { id: '123123' } }  };

  const mockSimilarResponse = {
    page: 1,
    results: new Array(3).fill(movie),
    total_results: 0
  };
  window.fetch = jest.fn();
  window.fetch.mockImplementation((url) => {
    // when called for similar movies
    if ((new RegExp('movie/123123/similar')).test(url)) {
      return mockFetchResponse(mockSimilarResponse);
    }
    return mockFetchResponse(movie);
  });

  const { container, getByTestId, queryAllByTestId } = render(<Movie {...props} />);

  await waitForElementToBeRemoved(() =>
    container.querySelector('.ant-spin')
  );

  expect(getByTestId('info-card')).toBeInTheDocument();
  expect(queryAllByTestId('movie-card')).toHaveLength(3);
});
