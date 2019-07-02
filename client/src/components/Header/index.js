import React, { Component } from "react";
import { Layout, Icon, Button, Row, Col } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { switchAuthModal, logout } from "../../redux/authentication/actions";
import { Redirect } from "react-router-dom";
import storage from "../../services/storage";

class Header extends Component {
  getLoggedUserName() {
    const user = storage.getUser();
    return (user && user.username && user.username.toUpperCase()) || "";
  }

  handleLogout() {
    this.props.logout();
    return <Redirect to="/login" />;
  }

  render() {
    let { switchAuthModal, isAuthenticated } = this.props;
    const { Header } = Layout;
    return (
      <Header style={{ background: "#fff", padding: 0 }}>
        <Row type="flex" justify="space-between">
          <Col>
            <Icon
              style={{
                marginLeft: 10,
                fontSize: 18,
                marginRight: 10
              }}
              type="reddit"
            />
            TODO
          </Col>
          <Col>
            {isAuthenticated ? (
              <>
                <span style={{ marginRight: 10 }}>
                  {this.getLoggedUserName()}
                </span>
                <Button
                  onClick={() => this.handleLogout()}
                  icon="poweroff"
                  type="danger"
                  style={{ marginRight: 50 }}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button
                  style={{ marginRight: 10 }}
                  type="primary"
                  onClick={() => switchAuthModal("login")}
                >
                  <Icon type="right" />
                  Log In
                </Button>
                <Button
                  style={{ marginRight: 50 }}
                  onClick={() => switchAuthModal("signup")}
                  type="primary"
                >
                  <Icon type="right" />
                  Sign Up
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Header>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      switchAuthModal,
      logout
    },
    dispatch
  );

const mapStateToProps = state => ({
  isAuthenticated: state.authentication
    ? state.authentication.isAuthenticated
    : false
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
