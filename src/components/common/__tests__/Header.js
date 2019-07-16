import React from 'react'
import { render, fireEvent } from 'utils/testUtil';
import Header from 'components/common/Header';

it('renders Header component with search', () => {
  const { getByText, container } = render(<Header showSearch />);

  expect(container.querySelector('input')).toBeInTheDocument();

  expect(container.getElementsByTagName('a')).toHaveLength(2);
  expect(getByText('Favorite', { selector: 'a' })).toHaveAttribute('href', '/list/favorite');
  expect(getByText('Watch Later', { selector: 'a' })).toHaveAttribute('href', '/list/watch_later');
});

it('renders Header component without search', () => {
  const { container, getByText } = render(<Header />);

  expect(container.querySelector('input')).not.toBeInTheDocument();

  expect(container.getElementsByTagName('a')).toHaveLength(3);
  expect(getByText('Home', { selector: 'a' })).toHaveAttribute('href', '/');
  expect(getByText('Favorite', { selector: 'a' })).toHaveAttribute('href', '/list/favorite');
  expect(getByText('Watch Later', { selector: 'a' })).toHaveAttribute('href', '/list/watch_later');
});
