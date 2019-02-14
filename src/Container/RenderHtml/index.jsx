/* eslint-disable react/no-danger */
import React, { Fragment, Component } from 'react';
import { Rnd } from 'react-rnd';

import TrollBox from '../TrollBox';


class RenderHtml extends Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: '',
    };
  }

  componentDidMount() {
    const init = {
      headers: {
        Accept: 'text/html',
        'Content-Type': 'text/html',
      },
    };
    document.title = 'Render html file';
    fetch('./shared/test.html', init)
      .then(response => response.text())
      .then(htmlContent => this.setState({ htmlContent }));
  }


  render() {
    const { htmlContent } = this.state;
    return (
      <Fragment>
        <div className="container text-center">
          <b>TrollBox Demo</b>
        </div>

        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />

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
            enableResizing={false}
          >
            <TrollBox />
          </Rnd>
        </div>
      </Fragment>
    );
  }
}


export default RenderHtml;
