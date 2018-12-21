import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import './trollBox.css';
import { withFirebase } from '../../components/firebase';

const INITIAL_STATE = {
  chats: [],
  message: '',
  user: JSON.parse(localStorage.getItem('user')) || '',
  mutedList: [],
  isPickerShow: false,
};

class TrollBox extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
    this.bindAllFunction();
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

  bindAllFunction() {
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSendMessage = this.handleSendMessage.bind(this);
    this.setUserName = this.setUserName.bind(this);
    this.handleMutedChat = this.handleMutedChat.bind(this);
    this.handleUnMutedChat = this.handleUnMutedChat.bind(this);
    this.handleTagNameClick = this.handleTagNameClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePickerModel = this.handlePickerModel.bind(this);
    this.closePickerModel = this.closePickerModel.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
  }

  handleTextChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleKeyPress(event) {
    const { user } = this.state;
    if (event.key === 'Enter' && user) {
      this.handleSendMessage();
    }
  }

  handleSendMessage(event) {
    if (event) event.preventDefault();
    this.sendTextMessage();
  }

  handleMutedChat(chat) {
    const { mutedList: prevMutedList } = this.state;
    const mutedSet = new Set(prevMutedList);
    mutedSet.add(chat.userId);
    const mutedList = Array.from(mutedSet);
    this.setState({ mutedList });
  }

  handleUnMutedChat(chat) {
    const { mutedList: prevMutedList } = this.state;
    const mutedSet = new Set(prevMutedList);
    mutedSet.delete(chat.userId);
    const mutedList = Array.from(mutedSet);
    this.setState({ mutedList });
  }

  handleTagNameClick(userName) {
    const { message } = this.state;
    if (!message.includes(`@${userName}`)) {
      this.setState(prevState => ({ message: `${prevState.message} @${userName} ` }));
    }
  }

  handlePickerModel() {
    this.setState((prevState => ({ isPickerShow: !prevState.isPickerShow })));
  }

  closePickerModel() {
    this.setState({ isPickerShow: false });
  }

  sendTextMessage() {
    const { firebase: { store: db } } = this.props;
    const { message, user } = this.state;
    if (message) {
      db.collection('chats').add({
        message,
        userName: user.name,
        userId: user.id,
        timestamp: new Date().getTime(),
      });
      this.setState({ message: '' }, this.closePickerModel);
    }
  }

  addEmoji(e) {
    const { message } = this.state;

    if (e.unified.length <= 5) {
      const emojiPic = String.fromCodePoint(`0x${e.unified}`);
      this.setState({
        message: message + emojiPic,
      });
    } else {
      const sym = e.unified.split('-');
      const codesArray = [];
      sym.forEach(el => codesArray.push(`0x${el}`));
      const emojiPic = String.fromCodePoint(...codesArray);
      this.setState({
        message: message + emojiPic,
      });
    }
  }

  async fetchChats() {
    const { firebase: { store: db } } = this.props;
    db.collection('chats').orderBy('timestamp', 'asc')
      .onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const { mutedList } = this.state;
          const message = change.doc.data();
          message.id = change.doc.id;
          const isMuted = mutedList.some(userId => userId === message.userId);
          if (change.type === 'added' && !isMuted) {
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
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 1000;
    // console.log('--------', scrollHeight, height, scrollTop);
  }

  render() {
    const {
      message, chats, user,
      mutedList, isPickerShow,
    } = this.state;

    return (
      <Fragment>
        <div className="panel panel-primary right-bottom">
          <div className="panel-heading" id="accordion">
            <span className="glyphicon glyphicon-comment" />
            {' '}
            Chat
            <div className="btn-group pull-right">
              <a
                type="button"
                className="btn btn-default btn-xs"
                data-toggle="collapse"
                data-parent="#accordion"
                href="#collapseOne"
              >
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
                          <button
                            className="btn btn-link p-0"
                            type="button"
                            onClick={() => { this.handleTagNameClick(chat.userName); }}
                          >
                            <strong className="primary-font">
                              {chat.userName}
                            </strong>
                          </button>

                          {user.id !== chat.userId
                            && (
                              <div className="pull-right">
                                {!mutedList.some(id => id === chat.userId) && (
                                  <button
                                    type="button"
                                    className="close"
                                    title="Muted"
                                    aria-label="Muted"
                                    onClick={() => { this.handleMutedChat(chat); }}
                                  >
                                    <span
                                      className="glyphicon glyphicon-volume-up"
                                      aria-hidden="true"
                                    />
                                  </button>
                                )
                                }

                                {mutedList.some(id => id === chat.userId) && (
                                  <button
                                    type="button"
                                    className="close"
                                    title="unMuted"
                                    aria-label="UnMuted"
                                    onClick={() => { this.handleUnMutedChat(chat); }}
                                  >
                                    <span
                                      className="glyphicon glyphicon-volume-off"
                                      aria-hidden="true"
                                    />
                                  </button>
                                )}

                              </div>
                            )
                          }
                        </div>
                        <p style={{ wordBreak: 'break-all' }}>
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
              {isPickerShow
                && (
                  <Picker
                    sheetSize={32}
                    showPreview={false}
                    showSkinTones={false}
                    style={{ position: 'absolute', bottom: '45px', right: '20px' }}
                    onSelect={this.addEmoji}
                  />
                )
              }
              <div className="input-group">
                <textarea
                  placeholder={user ? 'Type your message here...' : 'Type Your Name Here...'}
                  className="form-control"
                  style={{ height: '35px' }}
                  name="message"
                  type="text"
                  value={message}
                  onFocus={this.closePickerModel}
                  onKeyPress={this.handleKeyPress}
                  onChange={this.handleTextChange}
                />
                <div
                  className="emoji-icon pointer fa fa-smile-o"
                  role="button"
                  tabIndex="0"
                  onClick={this.handlePickerModel}
                  onKeyPress={this.handleKeyPress}
                />

                <span className="input-group-btn">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    style={{ height: '35px' }}
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
