import React, { Component } from "react";
import { Modal, Tabs, Form, Button, Input, Icon, Spin, Alert } from "antd";
import { connect } from "react-redux";

class AuthModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: null
    };
  }

  componentDidMount() {
    this.initState();
  }

  initState = () => {
    this.setState({
      loginUser: null,
      loginPass: null,
      signupUser: null,
      signupPass: null
    });
  };

  onCancel = () => {
    this.setState({
      activeTab: null
    });
    this.props.onCancel();
  };

  onInputChange = (e, name) => {
    this.setState({
      [name]: e.target.value
    });
  };

  handleLogin = () => {
    this.props.handleLogin({
      username: this.state.loginUser,
      password: this.state.loginPass
    });
    this.initState();
  };

  handleSignup = () => {
    this.props.handleSignup({
      username: this.state.signupUser,
      password: this.state.signupPass
    });
    this.initState();
  };

  render() {
    let { authTab, loading, authAlert } = this.props;
    let {
      activeTab,
      loginUser,
      loginPass,
      signupUser,
      signupPass
    } = this.state;
    const TabPane = Tabs.TabPane;
    return (
      <Modal
        title={
          <div style={{ textAlign: "center" }}>
            <Icon
              style={{
                marginLeft: 10,
                fontSize: 18,
                marginRight: 10
              }}
              type="reddit"
            />
            Join TODO
          </div>
        }
        footer={null}
        visible={this.props.visible}
        onCancel={this.onCancel}
      >
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <Spin size="large" />
          </div>
        ) : (
          <Tabs
            activeKey={activeTab || authTab || "login"}
            onChange={key => this.setState({ activeTab: key })}
          >
            <TabPane tab="Log In" key="login">
              <Form>
                <Form.Item style={{ marginBottom: 0 }} label="Username">
                  <Input
                    onChange={e => this.onInputChange(e, "loginUser")}
                    value={loginUser}
                    placeholder="admin"
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }} label="Password">
                  <Input.Password
                    onChange={e => this.onInputChange(e, "loginPass")}
                    value={loginPass}
                    placeholder="123456"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    block
                    onClick={this.handleLogin}
                  >
                    Login
                  </Button>
                  {authAlert ? (
                    <Alert message={authAlert} type="error" showIcon />
                  ) : (
                    ""
                  )}
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Sign Up" key="signup">
              <Form>
                <Form.Item style={{ marginBottom: 0 }} label="Username">
                  <Input
                    onChange={e => this.onInputChange(e, "signupUser")}
                    value={signupUser}
                  />
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }} label="Password">
                  <Input.Password
                    onChange={e => this.onInputChange(e, "signupPass")}
                    value={signupPass}
                  />
                  <Button
                    type="primary"
                    style={{ marginTop: 20, marginBottom: 20 }}
                    block
                    onClick={this.handleSignup}
                  >
                    Sign Up
                  </Button>
                </Form.Item>
                {authAlert ? (
                  <Alert message={authAlert} type="error" showIcon />
                ) : (
                  ""
                )}
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  Already have an account?
                  <span
                    style={{
                      marginLeft: 3,
                      color: "#1890ff",
                      cursor: "pointer"
                    }}
                    onClick={() => this.setState({ activeTab: "login" })}
                  >
                    Login
                  </span>
                </div>
              </Form>
            </TabPane>
          </Tabs>
        )}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  authTab: state.authentication ? state.authentication.authTab : null,
  loading: state.authentication ? state.authentication.loading : false,
  authAlert: state.authentication
    ? state.authentication.alert && state.authentication.alert.message
    : null,
  isAuthenticated: state.authentication
    ? state.authentication.isAuthenticated
    : false
});

export default connect(mapStateToProps)(AuthModal);
