import React from 'react'
import { render } from 'utils/testUtil';
import Rating from 'components/common/Rating';

it('shows votes counts correctly', () => {
  const rating = 9;
  const voteCounts = 100;
  const { getByText } = render(<Rating rating={rating} voteCount={voteCounts}/>);

  expect(getByText(new RegExp(voteCounts))).toBeInTheDocument();
});
