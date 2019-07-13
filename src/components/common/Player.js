// @flow
import React from 'react';
import Player from 'react-player';

type Props = {
  key: string;
  provider: string;
}

function createYoutube(key) {
  return `https://www.youtube.com/watch?v=${key}`;
}

// TODO styles
export default function MoviePlayer({ videoKey, site }: Props) {
  const url = site === 'YouTube' ? createYoutube(videoKey) : '';
  return <Player url={url} width="70vw" height="70vh" />
}