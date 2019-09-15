import PropTypes from 'prop-types';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Auth from '../Pages/Auth';
import Feed from '../Pages/Feed';


const LoggedInRoutes = () => (
    <React.Fragment>
        <Route exact path="/" component={Feed}/>
    </React.Fragment>
);

const LoggedOutRoutes = () => (
    <React.Fragment>
        <Route exat path="/" component={Auth}/>
    </React.Fragment>
);

const Router = ({isLoggedIn}) => (
    <HashRouter>
        <Switch>
            {
                isLoggedIn ? 
                <LoggedInRoutes /> : 
                <LoggedOutRoutes />
            }
        </Switch>
    </HashRouter>
);

Router.prototype = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default Router;