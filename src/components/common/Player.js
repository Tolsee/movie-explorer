// @flow
import React from 'react';
import Player from 'react-player';

type Props = {
  videoKey: string;
  site: string;
}

function createYoutube(key) {
  return `https://www.youtube.com/watch?v=${key}`;
}

export default function MoviePlayer({ videoKey, site }: Props) {
  const url = site === 'YouTube' ? createYoutube(videoKey) : '';
  return <Player url={url} width="70vw" height="70vh" />
}
