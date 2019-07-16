import React from 'react'
import { render, fireEvent } from 'utils/testUtil';
import MovieCard from 'components/Movie/MovieCard';

const movie = {
  id: '123',
  coverImg: 'https://via.placeholder.com/500x281',
  title: 'Test Title',
  overview: 'Test overview',
  rating: 12,
  voteCount: 12300
};

it('render movie component', () => {
  const { getByText, container } = render(<MovieCard {...movie}/>);

  expect(getByText(movie.title)).toBeInTheDocument();
  expect(getByText(movie.overview)).toBeInTheDocument();
  expect(getByText(`${movie.voteCount} votes`)).toBeInTheDocument();
  expect(container.querySelector('img')).toBeInTheDocument();
  expect(container.querySelector('img')).toHaveAttribute('src', movie.coverImg);
});

it('calls goToMovie when card is clicked', () => {
  const goToMovie = jest.fn();
  const { container } = render(<MovieCard {...movie} goToMovie={goToMovie} />);

  fireEvent(container.querySelector('div'), new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
  }));

  expect(goToMovie).toHaveBeenCalledTimes(1);
});
