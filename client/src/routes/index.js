import React from "react";
import { Route, Router, Switch } from "react-router";
import { createBrowserHistory } from "history";
import Header from "../components/Header";
import Home from "../screens/Home";
import Task from "../screens/Task";
import PrivateRoute from "./PrivateRoute";

const Routes = props => {
  const history = createBrowserHistory(props);
  return (
    <>
      <Header />
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={Task} />
          <Route exact path="/login" component={Home} />
        </Switch>
      </Router>
    </>
  );
};
export default Routes;
