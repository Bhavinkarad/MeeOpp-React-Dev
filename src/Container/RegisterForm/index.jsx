/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button,
  Layout, notification,
  // Menu
} from 'antd';
import './Home.css';
import { connect } from 'react-redux';
import { withFirebase } from '../../Components/firebase';

import { createUserSuccess, createUserFail } from '../../redux/actions';

const { Header, Content, Footer } = Layout;
const FormItem = Form.Item;

class Home extends Component {
  constructor(props) {
    notification.config({ placement: 'bottomLeft' });
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      formLayout: 'horizontal',
    };
  }

  componentDidMount() {
    const id = localStorage.getItem('uuid');
    if (id) {
      this.findUserData(id);
    }
  }

  async findUserData(id) {
    try {
      const { firebase: { store }, dispatch } = this.props;
      const docRef = await store.collection('users').doc(id);
      const doc = await docRef.get();
      if (doc.exists) {
        dispatch(createUserSuccess({ ...doc.data(), id }));
      }
    } catch (error) {
      console.log('Error getting document:', error);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { form, user } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (user.id) {
          this.updateForm(values, user.id);
        } else {
          this.saveForm(values);
        }
      }
    });
  }

  async saveForm(values) {
    const { form, firebase: { store }, dispatch } = this.props;
    try {
      const { id, error } = await store.collection('users').add({ ...values });
      if (id) {
        dispatch(createUserSuccess({ ...values, id }));
        localStorage.setItem('uuid', id);
        form.resetFields();
        notification.open({
          message: 'User Created',
          description: 'save successfully',
        });
        if (error) {
          throw error;
        }
      }
    } catch (error) {
      dispatch(createUserFail(error.message));
    }
  }

  async updateForm(values, id) {
    const { form, firebase: { store }, dispatch } = this.props;
    try {
      const docRef = await store.collection('users').doc(id);
      await docRef.set({ ...values });
      dispatch(createUserSuccess({ ...values, id }));
      form.resetFields();
      notification.open({
        message: 'User Updated',
        description: 'save successfully',
      });
    } catch (error) {
      dispatch(createUserFail(error.message));
    }
  }

  render() {
    const { formLayout } = this.state;
    const { form: { getFieldDecorator }, user } = this.props;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 5 },
      wrapperCol: { span: 6 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 6, offset: 5 },
    } : null;
    return (
      <Layout>
        <b>demo</b>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">Home</Menu.Item>
        </Menu> */}
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <div
            style={{
              background: '#fff', margin: '16px 0', padding: 24, minHeight: 380,
            }}
          >

            <Form layout={formLayout} onSubmit={this.handleSubmit}>

              <FormItem
                label="First Name"
                {...formItemLayout}
              >
                {getFieldDecorator('firstName', {
                  initialValue: user.firstName,
                  rules: [{
                    required: true, message: 'Please enter your firstName!',
                  }],
                })(
                  <Input placeholder="first name" />,
                )}
              </FormItem>

              <FormItem
                label="Last Name"
                {...formItemLayout}
              >
                {getFieldDecorator('lastName', {
                  initialValue: user.lastName,
                  rules: [{
                    required: true, message: 'Please enter your lastName!',
                  }],
                })(
                  <Input placeholder="last name" />,
                )}
              </FormItem>

              <FormItem
                label="Company"
                {...formItemLayout}
              >
                {getFieldDecorator('company', {
                  initialValue: user.company,
                  rules: [{
                    required: true, message: 'Please enter your company name!',
                  }],
                })(
                  <Input placeholder="company" />,
                )}
              </FormItem>

              <FormItem
                label="Department"
                {...formItemLayout}
              >
                {getFieldDecorator('department', {
                  initialValue: user.department,
                })(
                  <Input placeholder="department" />,
                )}
              </FormItem>

              <FormItem
                label="Position"
                {...formItemLayout}
              >
                {getFieldDecorator('position', {
                  initialValue: user.position,
                })(
                  <Input placeholder="position" />,
                )}
              </FormItem>

              <FormItem
                label="Email"
                {...formItemLayout}
              >
                {getFieldDecorator('email', {
                  initialValue: user.email,
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input placeholder="email" />,
                )}
              </FormItem>

              <FormItem {...buttonItemLayout}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </FormItem>
            </Form>

          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          firebase+react
          example
        </Footer>
      </Layout>

    );
  }
}


Home.propTypes = {
  firebase: PropTypes.shape({}),
  dispatch: PropTypes.func.isRequired,
};

Home.defaultProps = {
  firebase: PropTypes.shape({}),
};

const mapStateToProps = state => state;
const WrappedHomeStore = connect(mapStateToProps)(Home);
const WrappedHomeForm = Form.create()(WrappedHomeStore);


export default withFirebase(WrappedHomeForm);
