import React from 'react'
import { render } from 'utils/testUtil';
import Player from 'components/common/Player';

it('renders player for YouTube', () => {
  const { container } = render(<Player videoKey="kajkskd" site="YouTube"/>);
  expect(container.querySelector('video')).toBeInTheDocument();
});


it('does not render player when site is other than YouTube', () => {
  const { container } = render(<Player videoKey="kajkskd" site="Vimeo"/>);
  expect(container.querySelector('video')).not.toBeInTheDocument();
});
