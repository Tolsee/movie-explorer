import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Icon from 'antd/lib/icon';
import message from 'antd/lib/message';

import {
  setFavoriteMovie,
  removeFavoriteMovie,
  checkFavorite
} from 'utils/localStorage';

const FavoriteContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: rgba(45, 162, 211, 0.8);
  position: relative;
  cursor: pointer;
  color: ${({ fav }) => fav ? '#f752ac' : '#fff'};
  &:hover {
    i {
      color: #f752ac;
    }
  }
`;

const Favorite = styled(Icon)`
  font-size: 24px;
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  color: white;
`;

type FavoriteProps = {
  id: string;
  className?: string;
}

export default function MovieFavorite({ className, id }: FavoriteProps) {
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    setFavorite(checkFavorite(id));
  }, [id]);

  function handleFavorite(e) {
    e.stopPropagation();
    if (favorite) {
      removeFavoriteMovie(id);
      setFavorite(false);
      message.success('Movie removed from favorite list.');
    } else {
      setFavoriteMovie(id);
      setFavorite(true);
      message.success('Movie added to favorite list.');
    }
  }

  return (
    <FavoriteContainer onClick={handleFavorite} className={className} fav={favorite}>
      <Favorite type="heart" theme={favorite ? 'twoTone' : null} twoToneColor="#f752ac" />
    </FavoriteContainer>
  )
}
