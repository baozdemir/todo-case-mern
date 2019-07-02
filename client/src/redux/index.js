import { combineReducers } from "redux";
import authentication from "./authentication/reducers";
import task from "./task/reducers";

export default combineReducers({
  authentication,
  task
});
