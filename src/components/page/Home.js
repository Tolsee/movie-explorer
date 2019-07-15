import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Input from 'antd/lib/input';
import Pagination from 'antd/lib/pagination';

import { MovieCard } from 'components/Movie/MovieCard';
import Loading from 'components/common/Loading';
import Section from 'components/common/Section';
import { createCoverImg } from 'utils/imageSrc';
import { search } from 'utils/api';

const { Search } = Input;

const HeaderWrapper = styled.div`
  margin-top: 24px;
`;

const StyledLoading = styled(Loading)`
  height: 50vh;
`;

const FooterWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 24px;
`;

export default function Home({ history }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(undefined);
  const [totalPage, setTotalPage] = useState(undefined);

  useEffect(() => {
    onSearch('', currentPage);
  }, [ currentPage ]);

  async function onSearch(searchText, page = 1) {
    setLoading(true);
    const { results, page: currentPage, total_pages: totalPage } = await search(searchText, page);
    setMovies(results);
    setCurrentPage(currentPage);
    setTotalPage(totalPage);
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
          <Pagination total={totalPage} onChange={onPageChange} />
        </FooterWrapper>
      );
  }

  return (
    <Section>
      <HeaderWrapper>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </HeaderWrapper>
      {
        loading ? <StyledLoading size="large" /> :
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
      {renderPagination()}
    </Section>
  );
}
