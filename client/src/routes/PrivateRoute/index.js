import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRoute extends Component {
  render() {
    const { component: Component, isAuthenticated, ...props } = this.props;

    return (
      <Route
        {...props}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" state={{ from: props.location }} />
          )
        }
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  location: PropTypes.shape()
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  };
};

export default connect(mapStateToProps)(PrivateRoute);
