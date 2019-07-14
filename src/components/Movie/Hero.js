import React from 'react';
import styled from 'styled-components';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router-dom';
import {H1, Paragraph} from 'components/common/typo';
import Favorite from 'components/common/Favorite'

const HeroSection = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  &::after {
    display: block;
    position: absolute;
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0, #000 100%);
    bottom: 0;
    height: 30vh;
    width: 100%;
    content: '';
  }
`;

const TitleBar = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  bottom: calc(1em + 48px);
  left: 0;
  width: 100%;
  padding: 0 5vw;
  z-index: 2;
`;

const Title = styled(H1)`
  && {
    color: #fff;
    margin-bottom: 8px;
    line-height: 1;
  }
`;

const TagLine = styled(Paragraph)`
  color: #fff;
  margin-bottom: 0;
`;

const CoverImg = styled.img`
  width: 100%;
  height: auto;
`;

const BackLink = styled(Link)`
  position: fixed;
  top: 24px;
  left: 24px;
  height: 48px;
  width: 48px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
`;

const Back = styled(Icon)`
  && {
    color: #fff; 
    font-size: 24px;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
  }
`;

type CardProps = {
  id: string;
  src: string;
  title: string;
  tagLine: string;
}

export default function Card({ id, src, title, tagLine }:CardProps) {
  return (
    <HeroSection>
      <BackLink to="/">
        <Back type="arrow-left"/>
      </BackLink>
      <CoverImg src={src} alt="" />
      <TitleBar>
        <div>
          <Title>{title}</Title>
          <TagLine>{tagLine}</TagLine>
        </div>
        <Favorite id={id} />
      </TitleBar>
    </HeroSection>
  )
}
