import React from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import { useQuery, useMutation } from 'react-apollo-hooks';

import { GET_USER, LOG_OUT } from './ProfileQueries';
import ProfilePresenter from './ProfilePresenter';
import Loader from '../../Components/Loader';


const Wrapper = styled.div`
  min-height: 60vh;
`;

const ProfileContainer = ({
  match: { params: { username } }
}) => {
  const {
    data:profileData , loading
  } = useQuery(GET_USER, {
    variables: { userName: username }
  });
  const [ logUserOut ] = useMutation(LOG_OUT);

  if (loading) {
    return (<Wrapper><Loader/></Wrapper>);
  } else {
    const {
      seeUser: {
        id, avatar, 
        userName, fullName, 
        isFollowing, isSelf, bio, 
        followingCount, followersCount,
        postsCount, posts
      }
    } = profileData;
    return (
      <Wrapper>
        <ProfilePresenter
          id={id}
          avatar={avatar}
          userName={userName}
          fullName={fullName}
          isFollowing={isFollowing}
          isSelf={isSelf}
          bio={bio}
          followingCount={followingCount}
          followersCount={followersCount}
          postsCount={postsCount}
          posts={posts}
          logOut={logUserOut}
        />
      </Wrapper>
    );
  }
};


export default withRouter(ProfileContainer);