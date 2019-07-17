import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Pagination from 'antd/lib/pagination';

import Header from 'components/common/Header';
import MovieCard from 'components/Movie/MovieCard';
import Loading from 'components/common/Loading';
import Section from 'components/common/Section';
import { Paragraph } from 'components/common/typo';

import { createCoverImg } from 'utils/imageSrc';
import { search } from 'utils/api';


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

export default function Home({ history }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalItems, setTotalItems] = useState(undefined);

  useEffect(() => {
    onSearch('', currentPage);
  }, [ currentPage ]);

  async function onSearch(searchText, page = 1) {
    setLoading(true);
    const { results, page: currentPage, total_results: totalItems } = await search(searchText, page);
    setMovies(results);
    setCurrentPage(currentPage);
    setTotalItems(Math.min(totalItems, 20000));
    setLoading(false);
  }

  function goToMovie(id) {
    history.push(`/movie/${id}`);
  }

  function onPageChange(currentPage) {
    setCurrentPage(currentPage);
  }

  function renderPagination() {
    return loading ? null :
      (
        <FooterWrapper>
          <Pagination
            current={currentPage}
            pageSize={20}
            total={totalItems}
            onChange={onPageChange} />
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
        We could not find any movie with given search text
      </NoData>
    )
  }

  return (
    <>
      <Header showSearch onSearch={onSearch}/>
      <Section>
        {movies.length || loading ? renderData() : renderNoData()}
      </Section>
    </>
  );
}
