// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { H1, Paragraph } from 'components/common/typo';
import Button from 'antd/lib/button';
import MoviePlayer from 'components/common/Player';
import Modal from 'components/common/Modal';
import MovieRating from 'components/common/Rating';
import type { RatingProps } from 'components/common/Rating';
import Favorite from 'components/common/Favorite';

const CardWrapper = styled.div`
  border-radius: 4px;
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
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayButton = styled(Button)`
  margin-top: 8px;
`;

const WatchLater = styled(Button)`
  margin-top: 8px;
  margin-left: 8px;
`;

type Props = {
  id: string;
  coverImg: string;
  title: string;
  overview: string;
  goToMovie: Function;
} & RatingProps;

export function MovieCard({ id, coverImg, title, overview, goToMovie, ...ratingProps }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [video, setVideo] = useState({});

  async function getVideo() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=fa8766f08ba2aaa90b64c21d14d6d3e7&language=en-US`).then(response => response.json());
    const results = response.results;
    const video = results.find(video => video.type === 'Trailer');
    return video;
  }

  async function handlePlay(e) {
    e.preventDefault();
    e.stopPropagation();
    const video = await getVideo();
    setVideo(video);
    setOpenModal(true);
  }

  async function handleWatchLater() {
    console.log('Watch later');
  }

  function handleCardClick() {
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
        <PlayButton icon="play-circle" onClick={handlePlay}>Play Trailer</PlayButton>
        <WatchLater icon="clock-circle" onClick={handleWatchLater}>Watch Later</WatchLater>
      </Desc>
      <Modal isOpen={openModal} onCancel={() => setOpenModal(false)}>
        <MoviePlayer videoKey={video.key} {...video} />
      </Modal>
    </CardWrapper>
  )
}
