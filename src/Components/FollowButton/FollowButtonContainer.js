import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";


const FollowButtonContainer = ({ isFollowing, id }) => {
  const [ isFollowingS, setIsFollowing ] = useState(isFollowing);
  const [ follow ] = useMutation(FOLLOW, { variables: { id } });
  const [ unfollow ] = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      unfollow();
    } else {
      setIsFollowing(true);
      follow();
    }
  };
  return (
    <FollowButtonPresenter 
      onClick={onClick}
      isFollowing={isFollowingS}
    />
  );
};


FollowButtonContainer.propTypes = {
  id: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired
};


export default FollowButtonContainer;