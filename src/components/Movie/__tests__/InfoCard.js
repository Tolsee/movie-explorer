import React from 'react'
import { render } from 'utils/testUtil';
import InfoCard from 'components/Movie/InfoCard';

const infoCardProps = {
  poster: 'https://via.placeholder.com/500x281',
  overview: 'Test overview',
  genres: [{
    id: 1,
    name: 'entertainment'
  }],
  trailer: {
    key: 'test_key',
    site: 'YouTube'
  },
  rating: 7,
  voteCount: 100,
  status: 'Released',
  runtime: 100,
  releaseDate: '2019-06-28'
};

it('renders InfoCard component', () => {
  const formattedReleaseDate = 'June 28, 2019';
  const formattedTime = '1 hr 40 min';

  const { container, getByText } = render(<InfoCard {...infoCardProps}/>);

  expect(getByText(infoCardProps.overview)).toBeInTheDocument();
  expect(getByText(infoCardProps.genres[0].name)).toBeInTheDocument();
  expect(getByText(`${infoCardProps.voteCount} votes`)).toBeInTheDocument();
  expect(getByText(infoCardProps.status)).toBeInTheDocument();
  expect(getByText(formattedReleaseDate)).toBeInTheDocument();
  expect(getByText(formattedTime)).toBeInTheDocument();

  expect(container.querySelector('img')).toBeInTheDocument();
  expect(container.querySelector('img')).toHaveAttribute('src', infoCardProps.poster);
});


