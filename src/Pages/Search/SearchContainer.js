import React from 'react';
import { withRouter } from 'react-router-dom';
import { useQuery } from 'react-apollo-hooks';
import SearchPresenter from './SearchPresenter';
import { SEARCH } from './SearchQueries';

export default withRouter(({ location: { search } }) => {
  const searchTerm = search.split('=')[1];
  const { data:searchResult, loading } = useQuery(SEARCH, {
    skip: searchTerm === undefined,
    variables: {
      term: searchTerm
    }
  });
  return (
    <SearchPresenter 
      loading={loading}
      searchTerm={searchTerm}
      searchResult={searchResult}
    />
  )
})