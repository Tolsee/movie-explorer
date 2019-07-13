import React, {useEffect, useState} from 'react';
import { createCoverImg } from 'utils/imageSrc';

import Hero from 'components/Movie/Hero';
import InfoCard from 'components/Movie/InfoCard';

export default function Movie(props) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    getMovie();
  }, []);

  async function getMovie() {
    const { match: { params: { id } } } = props;
    const movie = await fetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos&language=en-US&api_key=fa8766f08ba2aaa90b64c21d14d6d3e7`).then(response => response.json());
    setMovie(movie);
  }

  const {
    backdrop_path: path,
    poster_path: posterPath,
    title,
    tagline,
    overview,
    genres,
    vote_average: rating,
    vote_count: voteCount,
    videos: { results = [] } = {}
  } = movie;

  const cover = createCoverImg(path, 'original');
  const poster = createCoverImg(posterPath, 'original');
  const trailer = results.find(result => result.type === 'Trailer') || {};

  return (
    <div>
      <Hero src={cover} />
      <InfoCard
        title={title}
        tagLine={tagline}
        overview={overview}
        genres={genres}
        rating={rating}
        voteCount={voteCount}
        poster={poster}
        trailer={trailer}
      />
    </div>
  )
}
