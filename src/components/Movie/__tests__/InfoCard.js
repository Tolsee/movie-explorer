import React from 'react'
import { render } from 'utils/testUtil';
import InfoCard from 'components/Movie/InfoCard';

const InfoCardProps = {
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
  voteCount: 100
};

// TODO Complete Test
it('renders InfoCard properly', () => {
  const { container, getByText } = render(<InfoCard {...InfoCardProps}/>);

  expect(container.getElementsByTagName('img')).toHaveLength(1);
  expect(container.querySelector('img')).toHaveAttribute('src', InfoCardProps.poster);

  expect(getByText(InfoCardProps.overview)).toBeInTheDocument();

  expect(getByText(InfoCardProps.genres[0].name)).toBeInTheDocument();

});
