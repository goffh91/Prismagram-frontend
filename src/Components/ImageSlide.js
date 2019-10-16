import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';


const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;


const ImageSlide = ({ files }) => {
  const [ currentItem, setCurrentItem ] = useState(0);
  useEffect(() => {
    const totalFiles = files.length;
    if (currentItem === totalFiles - 1) {
      setTimeout(() => setCurrentItem(0), 2500);
    } else {
      setTimeout(() => setCurrentItem(currentItem + 1), 2500);
    }
  }, [ currentItem, files ]);

  return (
    <Files>
      {files && files.map((file, index) => (
          <File 
            key={file.id} 
            src={file.url} 
            showing={index === currentItem}
          />
      ))}
    </Files>
  );
};


ImageSlide.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
}


export default ImageSlide;