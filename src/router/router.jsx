import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../page/Home';
import Calculator from '../page/Calculator';
import Demo from '../page/Demo';

const AppRouter = () => (
  <Fragment>
    <Router>
      <Fragment>
        <Route path="/" exact component={Demo} />
        <Route path="/register" exact component={Home} />
        <Route path="/calculator/" component={Calculator} />
        <Route path="/demo/" component={Demo} />
      </Fragment>
    </Router>
  </Fragment>
);

export default AppRouter;
