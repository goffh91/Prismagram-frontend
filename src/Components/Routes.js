import PropTypes from 'prop-types';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Auth from '../Pages/Auth';
import Feed from '../Pages/Feed';
import Search from '../Pages/Search';
import Explore from '../Pages/Explore';
import Notifications from '../Pages/Notifications';
import Profile from '../Pages/Profile';


const LoggedInRoutes = () => (
    <Switch>
        <Route exact path="/" component={Feed}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/explore" component={Explore}/>
        <Route exact path="/notifications" component={Notifications}/>
        <Route exact path="/:username" component={Profile}/>
    </Switch>
);

const LoggedOutRoutes = () => (
    <Switch>
        <Route exat path="/" component={Auth}/>
    </Switch>
);

const Router = ({isLoggedIn}) => (
    <HashRouter>
        {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </HashRouter>
);

Router.prototype = {
    isLoggedIn: PropTypes.bool.isRequired
}

export default Router;