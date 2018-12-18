import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './trollBox.css';
import { withFirebase } from '../../components/firebase';

const INITIAL_STATE = {
  chats: [],
  message: '',
  user: JSON.parse(localStorage.getItem('user')) || '',
};

class TrollBox extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.setUserName = this.setUserName.bind(this);
  }

  componentDidMount() {
    this.fetchChats();
  }

  setUserName(event) {
    event.preventDefault();
    const { message } = this.state;
    const user = {
      name: message,
      id: new Date().getTime() * 100000000 * Math.random(),
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({ user, message: '' });
  }

  handleTextChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSendMessage(event) {
    event.preventDefault();
    this.sendTextMessage();
  }

  sendTextMessage() {
    const { firebase: { store: db } } = this.props;
    const { message, user } = this.state;

    db.collection('chats').add({
      message,
      userName: user.name,
      userId: user.id,
      timestamp: new Date().getTime(),
    });
    this.setState({ message: '' });
  }

  async fetchChats() {
    const { firebase: { store: db } } = this.props;
    db.collection('chats').orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const message = change.doc.data();
          message.id = change.doc.id;
          if (change.type === 'added') {
            this.setState(prevState => ({ chats: [...prevState.chats, message] }));
            this.scrollToBottom();
          }
        });
      });
  }

  scrollToBottom() {
    const { scrollHeight } = this.messageList;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { message, chats, user } = this.state;

    return (
      <Fragment>
        TrollBox Demo
        <div className="panel panel-primary right-bottom">
          <div className="panel-heading" id="accordion">
            <span className="glyphicon glyphicon-comment" />
            {' '}
            Chat
            <div className="btn-group pull-right">
              <a type="button" className="btn btn-default btn-xs" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                <span className="glyphicon glyphicon-chevron-down" />
              </a>
            </div>
          </div>
          <div className="panel-collapse collapse" id="collapseOne">
            <div
              className="panel-body"
              ref={(div) => {
                this.messageList = div;
              }}
            >
              <ul className="chat">
                {
                  !!chats.length && chats.map(chat => (
                    <li className="left clearfix" key={chat.id}>
                      <div className="chat-body clearfix">
                        <div className="header">
                          <strong className="primary-font">{chat.userName}</strong>
                        </div>
                        <p>
                          {chat.message}
                        </p>
                      </div>
                    </li>
                  ))
                }
                {
                  !chats.length
                  && (
                    <div className="chat-body text-center clearfix">
                      <p>
                        <b>Be a first User</b>
                      </p>
                    </div>
                  )
                }

              </ul>
            </div>
            <div className="panel-footer">
              <div className="input-group">
                <input
                  className="form-control input-sm"
                  placeholder={user ? 'Type your message here...' : 'Type Your Name Here...'}
                  name="message"
                  type="text"
                  value={message}
                  onChange={this.handleTextChange}
                />
                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={user ? this.handleSendMessage : this.setUserName}
                  >
                    {user ? 'Send' : 'save'}
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

TrollBox.propTypes = {
  firebase: PropTypes.shape({}),
};

TrollBox.defaultProps = {
  firebase: PropTypes.shape({}),
};
export default withFirebase(TrollBox);
