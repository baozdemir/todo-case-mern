import React, { Component } from "react";
import "./index.css";
import AuthModal from "../../components/AuthModal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import {
  switchAuthModal,
  login,
  signup
} from "../../redux/authentication/actions";

class Home extends Component {
  constructor(props) {
    super(props);
    if (this.props.isAuthenticated) {
      return this.props.history.push("/");
    }
  }
  handleLogin = async credentials => {
    await this.props.login(credentials);
  };

  handleSignup = async credentials => {
    await this.props.signup(credentials);
  };

  render() {
    if (this.props.isAuthenticated) {
      // If isCreateSuccess success set to truthy, create action
      // is completed and we may redirect to list page.
      return <Redirect to="/" />;
    }

    let { authModalVisibility, switchAuthModal, mainText } = this.props;
    return (
      <div className="App">
        <div>{mainText}</div>
        <AuthModal
          visible={authModalVisibility}
          onCancel={() => switchAuthModal()}
          handleLogin={this.handleLogin}
          handleSignup={this.handleSignup}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authModalVisibility: state.authentication
    ? state.authentication.authModalVisibility
    : false,
  mainText: state.authentication ? state.authentication.mainText : null,
  isAuthenticated: state.authentication
    ? state.authentication.isAuthenticated
    : false
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      switchAuthModal,
      login,
      signup
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
