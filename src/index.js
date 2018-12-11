/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import 'antd/dist/antd.css';
import './index.css';

import Home from './page/Home';
import * as serviceWorker from './serviceWorker';

import Firebase, { FirebaseContext } from './components/firebase';

const Root = () => (
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <Home />
    </FirebaseContext.Provider>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
