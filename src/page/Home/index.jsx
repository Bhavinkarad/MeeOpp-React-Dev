/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Button,
  Layout, Menu, notification,
} from 'antd';
import './Home.css';
import { connect } from 'react-redux';
import Firebase, { withFirebase } from '../../components/firebase';

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

  async handleSubmit(e) {
    e.preventDefault();
    const { form, firebase: { store }, dispatch } = this.props;
    try {
      form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const { id, error } = await store.collection('users').add({ ...values });
          if (id) {
            dispatch(createUserSuccess({ ...values, id }));
            form.resetFields();
            notification.open({
              message: 'Thank you..',
              description: 'save successfully',
            });
          }

          if (error) {
            throw error;
          }
        }
      });
    } catch (error) {
      dispatch(createUserFail(error.message));
    }
  }

  render() {
    const { formLayout } = this.state;
    const { form: { getFieldDecorator } } = this.props;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 5 },
      wrapperCol: { span: 6 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 6, offset: 5 },
    } : null;
    return (
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Home</Menu.Item>
          </Menu>
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
                {getFieldDecorator('department')(
                  <Input placeholder="department" />,
                )}
              </FormItem>

              <FormItem
                label="Position"
                {...formItemLayout}
              >
                {getFieldDecorator('position')(
                  <Input placeholder="position" />,
                )}
              </FormItem>

              <FormItem
                label="Email"
                {...formItemLayout}
              >
                {getFieldDecorator('email', {
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
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => state;
const WrappedHomeForm = Form.create()(Home);
const WrappedHomeStore = connect(mapStateToProps)(WrappedHomeForm);


export default withFirebase(WrappedHomeStore);
