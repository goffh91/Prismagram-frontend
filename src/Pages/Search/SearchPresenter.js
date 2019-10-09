import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FatText from '../../Components/FatText';
import Loader from '../../Components/Loader';
import UserCard from '../../Components/UserCard';


const Wrapper = styled.div`
  height: 50vh;
`;

const Section = styled.div`
  margin-bottom: 40px;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 180px;
  grid-auto-rows: 180px;
`;


const SearchPresenter = ({ loading, searchTerm, searchResult }) => {
  if (searchTerm === undefined) {
    return (<Wrapper><FatText text={'Search something plz..'}/></Wrapper>);
  } else if (loading === true) {
    return (<Wrapper><Loader/></Wrapper>);
  } else if (searchResult && searchResult.searchUser && searchResult.searchPost) {
    return (
      <Wrapper>
        <Section>
        {searchResult.searchUser.length === 0 ? (
          <FatText text="No Users Found" />
        ) : (
          searchResult.searchUser.map(user => (
            <UserCard
              key={user.id}
              id={user.id}
              userName={user.userName}
              isFollowing={user.isFollowing}
              isSelf={user.isSelf}
              url={user.avatar}
            />
          ))
        )}
        </Section>
        <Section>
          {searchResult.searchPost.length === 0 ? (
            <FatText text="No Posts Found" />
          ) : (
            searchResult.searchPost.map(post => null)
          )}
        </Section>
      </Wrapper>
    );
  }
};


SearchPresenter.propTypes = {
  searchTerm: PropTypes.string
};


export default SearchPresenter;