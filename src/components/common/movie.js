// @flow
import React, { useState } from 'react';
import styled from 'styled-components';
import { H1, Paragraph } from 'components/common/typo';
import Rate from 'antd/lib/rate';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import MoviePlayer from 'components/common/Player';
import Modal from 'components/common/Modal';

import 'antd/lib/card/style/index.css';
import 'antd/lib/rate/style/index.css';
import 'antd/lib/icon/style/index.css';
import 'antd/lib/button/style/index.css';

const CardWrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
  margin: 12px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.lighterGrey};
`;

const Cover = styled.div`
  height: 240px;
  position: relative;
`;

const CoverImg = styled.img`
  height: 100%;
  width: auto;
`;

const FavoriteContainer = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: rgba(45, 162, 211, 0.8);
  position: absolute;
  bottom: 12px;
  right: 8px;
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

const Title = styled(H1)`
  margin-top: 0;
`;

const Desc = styled.div`
  flex: 1;
  padding: 0 12px;
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

const VoteCount = styled.span`
  color: ${({ theme }) => theme.colors.lightGrey};
  font-size: 14px;
`;

type RatingProps = {
  rating: number;
  voteCount: number;
}

function MovieRating({ rating, voteCount }: RatingProps) {
  return (
    <div>
      <Rate disabled count={10} value={rating} />
      <VoteCount>{voteCount} votes</VoteCount>
    </div>
  )
}

type Props = {
  coverImg: string;
  title: string;
  overview: string;
} & RatingProps;

export function MovieCard({ id, coverImg, title, overview, ...ratingProps }: Props) {
  const [playModal, setPlayModal] = useState(false);
  const [video, setVideo] = useState({});

  async function getVideo() {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=fa8766f08ba2aaa90b64c21d14d6d3e7&language=en-US`).then(response => response.json());
    const results = response.results;
    const video = results.find(video => video.type === 'Trailer');
    return video;
  }

  async function handlePlay() {
    const video = await getVideo();
    setVideo(video);
    setPlayModal(true);
  }

  async function handleWatchLater() {
    console.log('Watch later');
  }

  return  (
    <CardWrapper>
      <Cover>
        <CoverImg src={coverImg} alt={ `${title} poster` } />
        <FavoriteContainer>
          <Favorite type="heart" />
        </FavoriteContainer>
      </Cover>
      <Desc>
        <Title>{title}</Title>
        <Overview>{overview}</Overview>
        <MovieRating {...ratingProps} />
        <PlayButton icon="play-circle" onClick={handlePlay}>Play Trailer</PlayButton>
        <WatchLater icon="clock-circle" onClick={handleWatchLater}>Watch Later</WatchLater>
      </Desc>
      <Modal isOpen={playModal} onCancel={() => setPlayModal(false)}>
        <MoviePlayer videoKey={video.key} {...video} />
      </Modal>
    </CardWrapper>
  )
}
