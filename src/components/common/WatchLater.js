// @flow
import React from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';

const StyledButton = styled(Button)`
  margin-top: 8px;
  margin-left: 8px;
`;

type WatchLaterProps = {
  id: string;
  className?: string;
}

export default function WatchLater({ id, className }: WatchLaterProps) {
  function handleWatchLater(e) {
    e.stopPropagation();
    console.log('Watch Later');
  }

  return  (
    <StyledButton className={className} icon='clock-circle' onClick={handleWatchLater}>Watch Later</StyledButton>
  )
}
