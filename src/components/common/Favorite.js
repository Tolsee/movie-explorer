import React from "react";
import styled from 'styled-components';
import Icon from 'antd/lib/icon';

const FavoriteContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: rgba(45, 162, 211, 0.8);
  position: relative;
  cursor: pointer;
  color: #fff;
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
  function handleFavorite() {
    console.log(`Favorite ${id}`);
  }

  return (
    <FavoriteContainer onClick={handleFavorite} className={className}>
      <Favorite type="heart" />
    </FavoriteContainer>
  )
}
