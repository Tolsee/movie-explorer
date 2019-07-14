import React, { useState } from 'react';
import styled from 'styled-components';

import Button from 'antd/lib/button';
import Tag from 'antd/lib/tag';
import Divider from 'antd/lib/divider';

import { Paragraph } from 'components/common/typo';
import MovieRating from 'components/common/Rating';
import type { RatingProps } from 'components/common/Rating';
import MoviePlayer from 'components/common/Player';
import Modal from 'components/common/Modal';

const InfoContainer = styled.div` 
  width: 90vw;
  margin: -48px auto 24px;
  z-index: 2;
  position: relative;
`;

const Card = styled.div`
  border-radius: 20px;
  background-color: #fff;
  padding: 48px;
  box-shadow: 0 0 40px 0 rgba(0,0,0,.10);
`;

const DescriptionContainer = styled.div`
  display: flex;
`;

const LeftSection = styled.div`
  max-width: 300px;
`;

const RightSection = styled.div`
  flex: 1; 
  margin-left: 24px;
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

const TableContainer = styled.div``;

const Section = styled.div`
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
} & RatingProps;

export default function InfoCard({
                                   poster,
                                   overview,
                                   genres = [],
                                   rating,
                                   voteCount,
                                   trailer,
                                   releaseDate,
                                   status,
                                   runtime
                                 }: InfoProps) {
  const [openModal, setOpenModal] = useState(false);

  function modalToggle() {
    setOpenModal(!openModal);
  }

  return (
    <InfoContainer>
      <Card>
        <DescriptionContainer>
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
            <Divider />
            <TableContainer>
              <Section>
                <InfoKey>Status</InfoKey>
                <InfoValue>{status}</InfoValue>
              </Section>
              <Section>
                <InfoKey>Release Date</InfoKey>
                <InfoValue>{releaseDate}</InfoValue>
              </Section>
              <Section>
                <InfoKey>Runtime</InfoKey>
                <InfoValue>{runtime}</InfoValue>
              </Section>
            </TableContainer>
          </RightSection>
        </DescriptionContainer>
      </Card>
    </InfoContainer>
  );
}
