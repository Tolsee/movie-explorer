import React from 'react'
import { render, waitForElement } from 'utils/testUtil';
import Player from 'components/common/Player';

const trailers = {
  results: [
    {
      key: 'kajkskd',
      site: 'YouTube',
      type: 'Trailer'
    }
  ]
};

it('renders player for YouTube', () => {
  const { container } = render(<Player videoKey="kajkskd" site="YouTube"/>);
  expect(container.querySelector('video')).toBeInTheDocument();
});

it('renders player when id is passed as prop', async () => {
  jest.spyOn(window, 'fetch');
  const mockJsonPromise = Promise.resolve(trailers);
  const mockFetchPromise = Promise.resolve({
    json: () => mockJsonPromise,
  });

  window.fetch = jest.fn(() => mockFetchPromise);

  const { container } = render(<Player id="asd" />);
  await waitForElement(() => container.querySelector('video'));
  expect(container.querySelector('video')).toBeInTheDocument();
});

it('does not render player when site is other than YouTube', () => {
  const { container } = render(<Player videoKey="kajkskd" site="Vimeo"/>);
  expect(container.querySelector('video')).not.toBeInTheDocument();
});
