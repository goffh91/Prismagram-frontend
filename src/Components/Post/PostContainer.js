import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useInput from '../../Hooks/useInput';
import PostPresenter from './PostPresenter';
import { useMutation } from 'react-apollo-hooks';
import { TOGGLE_LIKE, ADD_COMMENT } from './PostQueries';
import { toast } from 'react-toastify';

const PostContainer = ({
    id,
    user,
    files,
    likeCount,
    isLiked,
    comments,
    createdAt,
    caption,
    location
}) => {
    const [ isLikedS, setIsLiked ] = useState(isLiked);
    const [ likeCountS, setLikeCount ] = useState(likeCount);
    const [ currentItem, setCurrentItem ] = useState(0);
    const [ addComments, setAddComments ] = useState([]);
    
    useEffect(() => {
      const totalFiles = files.length;
      if (currentItem === totalFiles - 1) {
          setTimeout(() => setCurrentItem(0), 2500);
      } else {
          setTimeout(() => setCurrentItem(currentItem + 1), 2500);
      }
    }, [ currentItem, files ]);

    const [ toggleLike ] = useMutation(TOGGLE_LIKE, {
        variables: { postId: id }
    });

    const comment = useInput('');
    const [ addComment ] = useMutation(ADD_COMMENT, {
        variables: { postId: id, text: comment.value }
    });

    const handleToggleLike = () => {
        try {
            toggleLike();
            if (isLikedS === true) {
                setIsLiked(false);
                setLikeCount(likeCountS - 1);
            } else {
                setIsLiked(true);
                setLikeCount(likeCountS + 1);
            }
        } catch {
            toast.error('Fail to like this feed.');
        }
    };

    const handleKeyPress = async (event) => {
        const { which } = event;
        if (which === 13) {
            event.preventDefault();
            try {
              const { data: { addComment:addCommentS } } = await addComment();
              setAddComments([ ...addComments, addCommentS ]);
              comment.setValue('');
            } catch {
              toast.error('Fail to add comment.');
            }
        }
    }

    return (
        <PostPresenter
            id={id}
            user={user}
            files={files}
            likeCount={likeCountS}
            isLiked={isLikedS}
            comments={comments}
            createdAt={createdAt}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            caption={caption}
            location={location}
            currentItem={currentItem}
            handleToggleLike={handleToggleLike}
            handleKeyPress={handleKeyPress}
            addComments={addComments}
        />
    );
}

PostContainer.propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        avatar: PropTypes.string,
        userName: PropTypes.string.isRequired
    }).isRequired,
    files: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount: PropTypes.number.isRequired,
    isLiked: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                avatar: PropTypes.string,
                userName: PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    caption: PropTypes.string,
    location: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    newComment: PropTypes.shape({
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        setValue: PropTypes.func.isRequired
    }),
    addComments: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            user: PropTypes.shape({
                userName: PropTypes.string.isRequired
            }).isRequired
        })
    ),
    setLikeCount: PropTypes.number,
    handleToggleLike: PropTypes.func,
    handleKeyPress: PropTypes.func,
    setIsLiked: PropTypes.bool,
    currentItem: PropTypes.number
};


export default PostContainer;