import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import Button from '../../Components/Button';
import Avatar from '../../Components/Avatar';
import FatText from '../../Components/FatText';
import SquarePost from '../../Components/SquarePost';
import FollowButton from '../../Components/FollowButton';


const Wrapper = styled.div`
  min-height: 100vh;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-evenly;
  padding-bottom: 40px;
  margin-bottom: 40px;
  border-bottom: ${props => props.theme.boxBorder};
`;

const AvatarColumn = styled.div`
  padding: 0 75px;
  margin-right: 30px;
`;

const HeaderColumn = styled.div`
  width: 100%;
`;

const UserNameRow = styled.span`
  display: flex;
  align-items: center;
`;

const UserName = styled.span`
  font-size: 26px;
  margin: 0 15px 10px 0;
  display: block;
`;

const ButtonWrapper = styled.div`
  width: 80px;
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Counts = styled.ul`
  display: flex;
  margin: 15px 0px 20px;
`;

const Count = styled.li`
font-size: 16px;
  &:not(:last-child) {
    margin-right: 33px;
  }
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  width: 85%;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
  grid-gap: 15px;
`;

const ProfilePresenter = ({
  id,
  avatar,
  userName,
  fullName,
  isFollowing,
  isSelf,
  bio,
  followingCount,
  followersCount,
  postsCount,
  posts,
  logOut
}) => {
  return (
    <Wrapper>
      <Helmet>
        <title>{userName} | Prismagram</title>
      </Helmet>
      <Header>
        <AvatarColumn>
          <Avatar size="lg" url={avatar} />
        </AvatarColumn>
        <HeaderColumn>
          <UserNameRow>
            <UserName>{userName}</UserName>
            <ButtonWrapper>
            {isSelf ? (
              <Button 
                onClick={logOut}
                text={"LogOut"}
              />
            ) : (
              <FollowButton 
                id={id}
                isFollowing={isFollowing}
              />
            )}
            </ButtonWrapper>
          </UserNameRow>
          <Counts>
            <Count>
              <FatText text={String(postsCount)}/> posts
            </Count>
            <Count>
              <FatText text={String(followersCount)}/> followers
            </Count>
            <Count>
              <FatText text={String(followingCount)}/> following
            </Count>
          </Counts>
          <FullName text={fullName}/>
          <Bio>{bio}</Bio>
        </HeaderColumn>
      </Header>
      <Posts>
        {posts && posts.map(post => (
          <SquarePost
            key={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            file={post.files[0]}
          />
        ))}
      </Posts>
    </Wrapper>
  );
};


ProfilePresenter.propTypes = {
  avatar: PropTypes.string
};


export default ProfilePresenter;