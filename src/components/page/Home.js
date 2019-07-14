import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import { MovieCard } from 'components/Movie/MovieCard';
import { createCoverImg } from 'utils/imageSrc';

const { Search } = Input;

const HomeWrapper = styled.div`
  width: 100vw;
  padding: 0 12px; 
`;

const HeaderWrapper = styled.div`
  margin-top: 24px;
`;

export default function Home({ history }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    search();
  }, []);

  async function search(searchText) {
    let url;
    if (searchText) {
      const searchParams = searchText.split(' ').join('+');
      url = `https://api.themoviedb.org/3/search/movie?api_key=fa8766f08ba2aaa90b64c21d14d6d3e7&query=${searchParams}`;
    } else {
      url = 'https://api.themoviedb.org/3/discover/movie?api_key=fa8766f08ba2aaa90b64c21d14d6d3e7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
    }

    await fetch(url)
      .then(response => response.json())
      .then(result => {
        setMovies(result.results);
      })
  }

  function goToMovie(id) {
    history.push(`/movie/${id}`);
  }

  return (
    <HomeWrapper>
      <HeaderWrapper>
        <Search
          placeholder="input search text"
          onSearch={search}
          style={{ width: 200 }}
        />
      </HeaderWrapper>
      {
        movies.map(({ id, title, backdrop_path: path, overview, vote_average: rating, vote_count: voteCount }) =>
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
    </HomeWrapper>
  );
}
