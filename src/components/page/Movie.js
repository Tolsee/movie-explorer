import React, {useEffect, useState} from 'react';
import { createCoverImg } from 'utils/imageSrc';
import {getMovie, getSimilarMovies} from 'utils/api';

import Hero from 'components/Movie/Hero';
import InfoCard from 'components/Movie/InfoCard';
import { H1 } from 'components/common/typo';
import { MovieCard } from 'components/Movie/MovieCard';
import Section from 'components/common/Section';

export default function Movie({ history, match: { params: { id: movieId } }}) {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    (async function () {
      const movie = await getMovie(movieId);
      setMovie(movie);
      setLoading(false);
      const { results } = await getSimilarMovies(movieId);
      setSimilarMovies(results);
    })();
  }, [movieId]);

  function goToMovie(id) {
    history.push(`/movie/${id}`);
  }

  const {
    id,
    backdrop_path: path,
    poster_path: posterPath,
    title,
    tagline: tagLine,
    overview,
    genres,
    vote_average: rating,
    vote_count: voteCount,
    videos: { results = [] } = {},
    release_date: releaseDate,
    status,
    runtime
  } = movie;

  const cover = createCoverImg(path, 'original');
  const poster = createCoverImg(posterPath, 'original');
  const trailer = results.find(result => result.type === 'Trailer') || {};

  return (
    <div>
      <Hero id={id} src={cover} title={title} tagLine={tagLine} />
      <InfoCard
        id={id}
        overview={overview}
        genres={genres}
        rating={rating}
        voteCount={voteCount}
        poster={poster}
        trailer={trailer}
        releaseDate={releaseDate}
        status={status}
        runtime={runtime}
        loading={loading}
      />
      <Section>
        <H1>Similar Movies</H1>
        {
          similarMovies.map(({ id, title, backdrop_path: path, overview, vote_average: rating, vote_count: voteCount }) =>
            <MovieCard
              key={id}
              id={id}
              coverImg={createCoverImg(path)}
              title={title}
              overview={overview}
              rating={rating}
              voteCount={voteCount}
              goToMovie={goToMovie}
            />
          )
        }
      </Section>
    </div>
  )
}
