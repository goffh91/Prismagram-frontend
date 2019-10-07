import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FatText from '../../Components/FatText';

const Wrapper = styled.div`
  text-align: center;
  height: 50vh;
`;

const SearchPresenter = ({ searchTerm }) => (
  <Wrapper>
    {searchTerm === undefined ? (
      <FatText text={'Search something plz..'}/>
    ) : (
      <span>{searchTerm}</span>
    )}
  </Wrapper>
);

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string
};

export default SearchPresenter;