import React, { Fragment } from 'react';
import './chat.css';

function chat() {
  return (
    <Fragment>
      <div className="chat-wrapper">
          <div className="chat-header">header</div>
          <div className="chat-body">body </div>
          <div className="chat-footer">footer</div>
      </div>
    </Fragment>
  );
}


export default chat;
