import React, { Fragment, Component } from 'react';
import { Rnd } from 'react-rnd';

import TrollBox from '../TrollBox';

// import htmlContent from './test.html';

/* function createMarkup() {
  return { __html: htmlContent };
} */


class TrollBoxContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <div className="container text-center">
          <b>TrollBox Demo</b>
        </div>

        {/* <div dangerouslySetInnerHTML={createMarkup()} /> */}

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '400px',
          }}
        >
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
