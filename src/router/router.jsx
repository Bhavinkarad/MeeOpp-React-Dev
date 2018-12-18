import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../page/Home';
import Calculator from '../page/Calculator';
import TrollBox from '../page/TrollBox';

const AppRouter = () => (
  <Router>
    <React.Fragment>
      <Route path="/" exact component={TrollBox} />
      <Route path="/register" exact component={Home} />
      <Route path="/calculator/" component={Calculator} />
      <Route path="/trollbox/" component={TrollBox} />
    </React.Fragment>
  </Router>
);

export default AppRouter;
