import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterForm from '../Container/RegisterForm';
import RenderHtml from '../Container/RenderHtml';
import TrollBox from '../Container/TrollBox';

const AppRouter = () => (
  <Fragment>
    <Router>
      <Fragment>
        <Route path="/" exact component={RenderHtml} />
        <Route path="/register/" exact component={RegisterForm} />
        <Route path="/renderhtml/" component={RenderHtml} />
        <Route path="/popout/" component={TrollBox} />
      </Fragment>
    </Router>
  </Fragment>
);

export default AppRouter;
