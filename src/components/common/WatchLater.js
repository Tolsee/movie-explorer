// @flow
import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';

import {
  setWatchLaterMovie,
  removeWatchLaterMovie,
  checkWatchLater
} from 'utils/localStorage';

const StyledButton = styled(Button)`
  margin-top: 8px;
  margin-left: 8px;
`;

type WatchLaterProps = {
  id: string;
  className?: string;
}

export default function WatchLater({ id, className }: WatchLaterProps) {
  const [watchLater, setWatchLater] = useState(false);
  useEffect(() => {
    setWatchLater(checkWatchLater(id));
  }, [id]);

  function handleWatchLater(e) {
    e.stopPropagation();
    if (watchLater) {
      removeWatchLaterMovie(id);
      setWatchLater(false);
      message.success('Movie removed from watch later list.');
    } else {
      setWatchLaterMovie(id);
      setWatchLater(true);
      message.success('Movie added to watch later list.');
    }
  }

  return  (
    <StyledButton
      type={ watchLater ? 'primary' : null }
      className={className}
      icon='clock-circle'
      onClick={handleWatchLater}>
      Watch Later
    </StyledButton>
  )
}
