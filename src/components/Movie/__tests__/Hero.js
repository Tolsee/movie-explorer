import React from 'react'
import { render } from 'utils/testUtil';
import Hero from 'components/Movie/Hero';

it('renders image', () => {
  const src = 'https://via.placeholder.com/500x281';
  const { container } = render(<Hero src={src} />);

  expect(container.querySelector('img')).toBeInTheDocument();
  expect(container.querySelector('img')).toHaveAttribute('src', src);
});

it('renders go to home link', () => {
  const src = 'https://via.placeholder.com/500x281';
  const { container } = render(<Hero src={src} />);

  expect(container.querySelector('a')).toBeInTheDocument();
  expect(container.querySelector('a')).toHaveAttribute('href', '/');
});

it('renders title', () => {
  const src = 'https://via.placeholder.com/500x281';
  const title = 'Test Title';
  const { getByText } = render(<Hero src={src} title={title}/>);
  expect(getByText(title)).toBeInTheDocument();
});
