import React from 'react';
import Helmet from "react-helmet";
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import Loader from '../Components/Loader';
import Post from '../Components/Post';

const FEED_QUERY = gql`
  {
    seeFeed {
        id
        location
        caption
        user {
            id
            avatar
            userName
        }
        files {
            id
            url
        }
        likeCount
        isLiked
        comments {
            id
            text
            createdAt
            user {
                id
                userName
            }
        }
        createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`;

export default () => {
    const { data, loading } = useQuery(FEED_QUERY);
    return (
        <Wrapper>
            <Helmet>
                <title>Feed | Prismagram</title>
            </Helmet>
            {loading && <Loader />}
            {!loading && data && data.seeFeed &&
                data.seeFeed.map(
                    post => {
                        return (
                            <Post
                                key={post.id}
                                id={post.id}
                                user={post.user}
                                files={post.files}
                                likeCount={post.likeCount}
                                isLiked={post.isLiked}
                                comments={post.comments}
                                createdAt={post.createdAt}
                                location={post.location}
                                caption={post.caption}
                            />
                        );
                    }
                )
            }
        </Wrapper>
    );
};