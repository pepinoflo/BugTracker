var React = require('react');
var ReactDOM = require('react-dom');
import {Router, Route, Redirect, browserHistory} from 'react-router';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

import BugEdit from './components/BugEdit.jsx';
import BugList from './components/BugList.jsx';
import PageNotFound from './components/PageNotFound.jsx';

ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/bugs/:id" component={BugEdit} />
        <Route path="/bugs" component={BugList} />
        <Redirect from="/" to="/bugs" />
        <Route path="*" component={PageNotFound} />
    </Router>
    ),
    document.getElementById('main')
);
