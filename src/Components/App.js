import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { HashRouter } from "react-router-dom";
import styled, { ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import GlobalStyles from '../Styles/GlobalStyles';
import Theme from '../Styles/Theme';
import Routes from './Routes';
import Header from './Header';
import Footer from './Footer';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  margin: 120px auto;
`;

export default () => {
  const { data: { isLoggedIn } } = useQuery(QUERY);
  return(
    <ThemeProvider theme={Theme}>
      <HashRouter>
        {isLoggedIn && <Header />}
        <Wrapper>
          <GlobalStyles />
          <Routes isLoggedIn={isLoggedIn}/>
          <Footer />
          <ToastContainer 
            position={toast.POSITION.BOTTOM_CENTER}
            pauseOnVisibilityChange
            autoClose={2200}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            rtl={false}
            draggable
          />
        </Wrapper>
      </HashRouter>
    </ThemeProvider>
  );
}