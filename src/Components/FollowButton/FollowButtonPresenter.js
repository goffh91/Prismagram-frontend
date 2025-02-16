import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';


 const FollowButtonPresenter = ({ isFollowing, onClick }) => (
  <Button 
    onClick={onClick}
    text={isFollowing ? "Unfollow" : "Follow"}
  />
);


FollowButtonPresenter.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired
};


export default FollowButtonPresenter;