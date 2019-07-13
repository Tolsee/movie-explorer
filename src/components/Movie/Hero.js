import React from 'react';
import styled from 'styled-components';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router-dom';

const HeroSection = styled.div`
  width: 100%;
  max-height: 80vh;
  overflow: hidden;
  position: relative;
  z-index: 0;
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
  src: string;
}

export default function Card({ src }:CardProps) {
  return (
    <HeroSection>
      <BackLink to="/">
        <Back type="arrow-left"/>
      </BackLink>
      <CoverImg src={src} alt="" />
    </HeroSection>
  )
}
