// @flow
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { H1, Paragraph } from 'components/common/typo';
import Button from 'antd/lib/button';
import MoviePlayer from 'components/common/Player';
import Modal from 'components/common/Modal';
import MovieRating from 'components/common/Rating';
import type { RatingProps } from 'components/common/Rating';
import Favorite from 'components/common/Favorite';
import WatchLater from 'components/common/WatchLater';
import { getTrailerVideo } from 'utils/api';

const CardWrapper = styled.div`
  border-radius: 20px;
  overflow: hidden;
  margin: 24px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.lighterGrey};
  transition: all 0.5s ease-in-out !important; 
  cursor: pointer;
  &:hover {
    border: transparent solid 1px;
    box-shadow: 0 0 40px 0 rgba(0,0,0,.10);
  }
  @media (max-width: 992px) { 
    flex-direction: column;
  }
`;

const Cover = styled.div`
  min-height: 240px;
  position: relative;
  @media (max-width: 992px) { 
    width: 100%;
    min-height: auto;
  }
`;

const CoverImg = styled.img`
  height: 100%;
  width: auto;
  @media (max-width: 992px) { 
    width: 100%;
    height: auto;
  }
`;

const StyledFavorite = styled(Favorite)`
  && {
    position: absolute;
    bottom: 12px;
    right: 8px;
  }
`;

const Title = styled(H1)`
  && {
    margin-top: 0;
  }
`;

const Desc = styled.div`
  flex: 1;
  padding: 0 12px;
  @media (max-width: 992px) { 
    margin: 12px 0;
  }
`;

const Overview = styled(Paragraph)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayButton = styled(Button)`
  margin-top: 8px;
`;

type Props = {
  id: string;
  coverImg: string;
  title: string;
  overview: string;
  goToMovie: Function;
} & RatingProps;

export default function MovieCard({ id, coverImg, title, overview, goToMovie, ...ratingProps }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [video, setVideo] = useState({});

  useEffect(() => {
    (async function () {
      const video = await getTrailerVideo(id);
      setVideo(video || {});
    })()
  }, [id]);

  function playToggle(e) {
    e.stopPropagation();
    setOpenModal(!openModal);
  }

  function handleCardClick(e) {
    e.preventDefault();
    goToMovie(id);
  }

  return  (
    <CardWrapper onClick={handleCardClick}>
      <Cover>
        <CoverImg src={coverImg} alt={ `${title} poster` } />
        <StyledFavorite id={id} />
      </Cover>
      <Desc>
        <Title>{title}</Title>
        <Overview>{overview}</Overview>
        <MovieRating {...ratingProps} />
        <PlayButton icon="play-circle" onClick={playToggle}>Play Trailer</PlayButton>
        <WatchLater id={id} />
      </Desc>
      <Modal isOpen={openModal} onCancel={playToggle}>
        <MoviePlayer videoKey={video.key} {...video} />
      </Modal>
    </CardWrapper>
  )
}
