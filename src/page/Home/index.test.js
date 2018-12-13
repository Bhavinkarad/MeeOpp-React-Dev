/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'antd';
import { expect as expectChai } from 'chai';
import Home from './index';


describe('Home', () => {
  it('should render correctly in "debug" mode', () => {
    const homeComponent = shallow(<Home debug />);

    expect(homeComponent).toMatchSnapshot();
    homeComponent.unmount();
  });

  it('should have Layout Component', () => {
    const homeComponent = shallow(<Home />);

    expectChai(homeComponent.find(Button)).to.have.lengthOf(0);
  });
});
