// @flow
import React, { useState, useEffect } from 'react';
import Player from 'react-player';

import message from 'antd/lib/message';
import { getTrailerVideo } from 'utils/api';


type Props = {
  id?: string;
  videoKey?: string;
  site?: string;
}

function createYoutube(key) {
  return `https://www.youtube.com/watch?v=${key}`;
}

export default function MoviePlayer({ id, videoKey, site }: Props) {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (id) {
      (async function () {
        const video = await getTrailerVideo(id);
        if (!video) {
          message.error('Trailer could not be found');
        }
        const { key: videoKey, site } = video;
        const url = site === 'YouTube' ? createYoutube(videoKey) : '';
        setUrl(url)
      })()
    } else if (site === 'YouTube') {
        const url = createYoutube(videoKey);
        setUrl(url)
    } else {
      message.error('Trailer could not be found');
    }
  }, [id, videoKey, site]);

  return <Player url={url} width="70vw" height="70vh" />
}
