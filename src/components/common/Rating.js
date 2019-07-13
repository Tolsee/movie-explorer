import React from 'react';
import styled from 'styled-components';
import Rate from 'antd/lib/rate';

const VoteCount = styled.span`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 14px;
`;

export type RatingProps = {
  rating: number;
  voteCount: number;
}

export default function MovieRating({ rating, voteCount }: RatingProps) {
  return (
    <div>
      <Rate disabled count={10} value={rating} />
      <VoteCount>{voteCount} votes</VoteCount>
    </div>
  )
}
