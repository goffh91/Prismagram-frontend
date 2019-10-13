import { gql } from 'apollo-boost';

export const GET_USER = gql`
  query seeUser($userName: String!) {
    seeUser(userName: $userName) {
      id
      avatar
      userName
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation logUserOut($token: String!) {
    logUserOut @client
  }
`;