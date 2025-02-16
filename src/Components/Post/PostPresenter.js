import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import TextAreaAutosize from 'react-autosize-textarea';

import ImageSlide from '../ImageSlide';
import FatText from '../FatText';
import Avatar from '../Avatar';
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";


const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  user-select: none;
  margin-bottom: 25px;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const TextArea = styled(TextAreaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-bottom: 15px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const Caption = styled.div`
  margin-top: 10px;
  span {
    margin-right: 5px;
  }
`;

const ELink = styled(Link)`
  color: inherit;
`;


export default ({
  user: { userName, avatar },
  location,
  files,
  caption,
  comments,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  handleToggleLike,
  handleKeyPress,
  addComments
}) => {
  return (
    <Post>
      <Header>
        <Avatar size="sm" url={avatar} />
        <UserColumn>
          <ELink to={`/${userName}`}>
            <FatText text={userName} />
          </ELink>
          <Location>{location}</Location>
        </UserColumn>
      </Header>

      <ImageSlide files={files}/>

      <Meta>
        <Buttons>
          <Button onClick={handleToggleLike}>
            {isLiked ? <HeartFull/> : <HeartEmpty/>}
          </Button>
          <Button><CommentIcon /></Button>
        </Buttons>
        <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />
        <Caption>
          <ELink to={`/${userName}`}>
            <FatText text={userName} />
          </ELink>
          {caption}
          <Timestamp>{createdAt}</Timestamp>
        </Caption>
        
        {comments && (
          <Comments>
            {comments.map(comment => (
              <Comment key={comment.id}>
                <ELink to={`/${comment.user.userName}`}>
                  <FatText text={comment.user.userName}/>
                </ELink>
                {comment.text}
              </Comment>
            ))}
            {addComments.map(comment => (
              <Comment key={comment.id}>
                <FatText text={comment.user.userName} />
                {comment.text}
              </Comment>
            ))}
          </Comments>
        )}
        <TextArea 
          placeholder={"Add a comment..."}
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyPress={handleKeyPress}
        />
      </Meta>
    </Post>
  );
};