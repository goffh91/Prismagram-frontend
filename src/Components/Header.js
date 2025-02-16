import React from 'react';
import styled from 'styled-components'

import { useQuery } from 'react-apollo-hooks';
import { Link, withRouter } from 'react-router-dom';
import { MY_PROFILE } from '../SharedQueries'

import Input from './Input';
import useInput from '../Hooks/useInput';
import { Compass, HeartEmpty, User, Logo } from './Icons';

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

export default withRouter(({ history }) => {
  const search = useInput('');
  const { data } = useQuery(MY_PROFILE);
  const onSearchSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to={"/"}>
            <span style={{
              color: '#000',
              fontSize: '1.25em',
              letterSpacing: '1.2px',
              fontWeight: 600
            }}>
              <Logo /> &nbsp;|&nbsp; Prismagram
            </span>
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput 
              placeholder={"Search"}
              value={search.value}
              onChange={search.onChange}
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to={"/explore"}>
            <Compass />
          </HeaderLink>
          <HeaderLink to={"/notifications"}>
            <HeartEmpty />
          </HeaderLink>
          {data && data.myProfile ? (
            <HeaderLink to={data.myProfile.userName}>
              <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={"/#"}>
              <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});