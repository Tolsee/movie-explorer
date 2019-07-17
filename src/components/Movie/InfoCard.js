import React, { useState } from 'react';
import styled from 'styled-components';
import { formatDate, formatTime } from "../../utils/format";

import Button from 'antd/lib/button';
import Tag from 'antd/lib/tag';
import Divider from 'antd/lib/divider';

import { Paragraph } from 'components/common/typo';
import MovieRating from 'components/common/Rating';
import type { RatingProps } from 'components/common/Rating';
import MoviePlayer from 'components/common/Player';
import Modal from 'components/common/Modal';
import Loading from 'components/common/Loading';
import Section from 'components/common/Section';
import WatchLater from 'components/common/WatchLater';

const InfoContainer = styled(Section)` 
  margin: -48px auto 24px;
  position: relative;
`;

const Card = styled.div`
  border-radius: 20px;
  background-color: #fff;
  padding: 48px;
  box-shadow: 0 0 40px 0 rgba(0,0,0,.10);
  display: flex;
  justify-content: center;
  @media (max-width: 992px) { 
    padding: 24px;
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  max-width: 300px;
  @media (max-width: 992px) { 
    max-width: none;
  }
`;

const RightSection = styled.div`
  flex: 1; 
  margin-left: 24px;
  @media (max-width: 992px) { 
    margin-left: 0;
    margin-top: 24px;
  }
`;

const Poster = styled.img`
  width: 100%;
  height: auto;
  border-radius: 4px;
`;

const PlayButton = styled(Button)`
  margin-top: 8px;
  width: 100%;
`;

const Overview = styled(Paragraph)``;

const Genres = styled.div`
  margin: 12px 0;
`;

const Genre = styled(Paragraph)`
  display: inline-block;
  margin: 0 12px 0 0;
`;

const StyledWatchLater = styled(WatchLater)`
  margin-left: 0;
`;

const TableContainer = styled.div``;

const Row = styled.div`
  display: flex;
`;

const InfoKey = styled(Paragraph)`
  font-weight: bold;
  flex: 1;
  margin-top: 0;
`;

const InfoValue = styled(Paragraph)`
  flex: 2;
`;

type InfoProps = {
  id: string;
  poster: string;
  overview: string;
  genres: {
    id: string;
    name: string;
  }[];
  trailer: {
    key: string;
    site: string;
  };
  releaseDate: string;
  status: string;
  runtime: number;
  loading: boolean;
} & RatingProps;

export default function InfoCard({
                                   id,
                                   poster,
                                   overview,
                                   genres = [],
                                   rating,
                                   voteCount,
                                   trailer,
                                   releaseDate,
                                   status,
                                   runtime,
                                   loading
                                 }: InfoProps) {
  const [openModal, setOpenModal] = useState(false);

  function modalToggle() {
    setOpenModal(!openModal);
  }

  function renderDetails() {
    return (
      <>
        <LeftSection>
          <Poster src={poster} alt="" />
          <PlayButton icon="play-circle" onClick={modalToggle}>Play Trailer</PlayButton>
          <Modal isOpen={openModal} onCancel={modalToggle}>
            <MoviePlayer videoKey={trailer.key} {...trailer} />
          </Modal>
        </LeftSection>
        <RightSection>
          <Overview>{overview}</Overview>
          <Genres>
            <Genre>Genres:</Genre>
            {
              genres.map(({ id, name }) => <Tag key={id} color="blue">{name}</Tag>)
            }
          </Genres>
          <MovieRating voteCount={voteCount} rating={rating} />
          <StyledWatchLater id={id} />
          <Divider />
          <TableContainer>
            <Row>
              <InfoKey>Status</InfoKey>
              <InfoValue>{status}</InfoValue>
            </Row>
            <Row>
              <InfoKey>Release Date</InfoKey>
              <InfoValue>{formatDate(releaseDate)}</InfoValue>
            </Row>
            <Row>
              <InfoKey>Runtime</InfoKey>
              <InfoValue>{formatTime(runtime)}</InfoValue>
            </Row>
          </TableContainer>
        </RightSection>
      </>
    );
  }

  return (
    <InfoContainer data-testid="info-card">
      <Card>
        {loading ? <Loading size="large" /> : renderDetails()}
      </Card>
    </InfoContainer>
  );
}
