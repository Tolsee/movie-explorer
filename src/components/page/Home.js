import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Input from 'antd/lib/input';
import { MovieCard } from 'components/common/movie';

// TODO icon style
import 'antd/lib/input/style/index.css';
import 'antd/lib/icon/style/index.css'

const { Search } = Input;

const HomeWrapper = styled.div`
  width: 100vw;
  padding: 0 12px; 
`;

const HeaderWrapper = styled.div`
  margin-top: 24px;
`;

function createCoverImg(path) {
  if (!path) return 'https://via.placeholder.com/500x281';
  return `https://image.tmdb.org/t/p/w500${path}`;
}

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    search('Wonder');
  }, []);

  function search(searchText) {
    const searchParams = searchText.split(' ').join('+');

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=fa8766f08ba2aaa90b64c21d14d6d3e7&query=${searchParams}`)
      .then(response => response.json())
      .then(result => {
        setMovies(result.results);
      })
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
            id={id}
            coverImg={createCoverImg(path)}
            title={title}
            overview={overview}
            rating={rating}
            voteCount={voteCount}
          />
        )
      }
    </HomeWrapper>
  );
}
