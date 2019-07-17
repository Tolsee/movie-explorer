import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Pagination from 'antd/lib/pagination';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router-dom';

import Header from 'components/common/Header';
import MovieCard from 'components/Movie/MovieCard';
import Loading from 'components/common/Loading';
import Section from 'components/common/Section';
import { Paragraph } from 'components/common/typo';

import { createCoverImg } from 'utils/imageSrc';
import { getMovie } from 'utils/api';
import { getFavoriteMovies, getWatchLaterMovies } from 'utils/localStorage';

const StyledLoading = styled(Loading)`
  height: 50vh;
`;

const NoData = styled(Paragraph)`
  text-align: center;
  margin-top: 48px;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

export default function List({ history, match: { params: { listName } } }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(undefined);

  useEffect(() => {
    (async function getMovies() {
      setLoading(true);
      let movieIds;
      if (listName === 'favorite') {
        movieIds = getFavoriteMovies();
      } else if (listName === 'watch_later') {
        movieIds = getWatchLaterMovies();
      } else {
        history.push('/');
      }
      const currentMovieIds = movieIds.slice((currentPage - 1) * pageSize, currentPage * pageSize - 1);
      const movies = await Promise.all(currentMovieIds.map(id => getMovie(id)));
      setMovies(movies);
      setTotalItems(movieIds.length);
      setLoading(false);
    })();
  }, [currentPage, pageSize, listName, history]);


  function goToMovie(id) {
    history.push(`/movie/${id}`);
  }

  function onPageChange(currentPage) {
    setCurrentPage(currentPage);
  }

  function onShowSizeChange(currentPage, pageSize) {
    setCurrentPage(currentPage);
    setPageSize(pageSize);
  }

  function renderPagination() {
    return loading ? null :
      (
        <FooterWrapper>
          <Pagination
            showSizeChanger
            current={currentPage}
            pageSize={pageSize}
            total={totalItems}
            onChange={onPageChange}
            onShowSizeChange={onShowSizeChange}
            pageSizeOptions={['5', '10', '15']} />
        </FooterWrapper>
      );
  }

  function renderData() {
    return loading ?
      <StyledLoading size="large"/> :
      (
        <>
          {
            movies.map(({
                          id,
                          title,
                          backdrop_path: path,
                          overview,
                          vote_average: rating,
                          vote_count: voteCount
                        }) =>
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
          {renderPagination()}
        </>
      )
  }

  function renderNoData() {
    return (
      <NoData>
        There is no movies in {listName === 'favorite' ? 'favorite' : 'watch later'} list. <Link to="/">Discover movies <Icon type="arrow-right" /></Link>
      </NoData>
    )
  }

  return (
    <>
      <Header />
      <Section>
        {movies.length || loading ? renderData() : renderNoData()}
      </Section>
    </>
  );
}
