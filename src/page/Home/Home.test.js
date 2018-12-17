
import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';

import Home from './index';

describe('Home component', () => {
  const initialState = {
    user: {
      id: null,
      firstName: null,
      lastName: null,
      company: null,
      position: null,
      department: null,
      email: null,
    },
  };
  const mockStore = configureStore();
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should render snapshot', () => {
    const WrapperHome = renderer.create(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const tree = WrapperHome.toJSON();
    expect(tree).toMatchSnapshot();
  });


  it('should render required form elements', () => {
    const WrapperHome = mount(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const form = WrapperHome.find('form');
    expect(form.length).toBe(1);
    expect(form.find('input').length).toBe(6);
    expect(form.find('button').length).toBe(1);
  });
});
