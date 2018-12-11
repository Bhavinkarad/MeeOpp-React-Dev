import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../redux/store';
import Firebase, { FirebaseContext } from '../../components/firebase';
import Home from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const Root = () => (
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <Home />
      </FirebaseContext.Provider>
    </Provider>
  );
  ReactDOM.render(<Root />, div);
  ReactDOM.unmountComponentAtNode(div);
});
