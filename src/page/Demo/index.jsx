import React, { Fragment, Component } from 'react';
import { Rnd } from 'react-rnd';


import TrollBox from '../TrollBox';

class TrollBoxContainer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (
      <Fragment>
        <div className="container text-center">
          <b>TrollBox Demo</b>
        </div>
        <div style={{ position: 'absolute', bottom: 0 }}>
          <Rnd
            style={{ position: 'relative' }}
            dragAxis="x"
            bounds="window"
            enableUserSelectHack={false}
          >
            <TrollBox />
          </Rnd>
        </div>
      </Fragment>
    );
  }
}


export default TrollBoxContainer;
