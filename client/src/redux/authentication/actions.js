import apiCall from "../../services/api";
import { actionType } from "./type";
import storage from "../../services/storage";

export const login = payload => async dispatch => {
  dispatch({
    type: actionType.START
  });
  try {
    const { data } = await apiCall({
      url: "/auth/login",
      method: "POST",
      data: payload,
      withAuth: false
    });

    storage.setAuth(data);

    dispatch({
      type: actionType.SWITCH_AUTH_MODAL
    });

    dispatch({
      type: actionType.LOGIN,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: actionType.UNAUTH_ERR,
      payload: (e && e.response && e.response.data) || null
    });
  }
};

export const signup = payload => async dispatch => {
  dispatch({
    type: actionType.START
  });
  try {
    const { data } = await apiCall({
      url: "/user",
      method: "POST",
      data: payload,
      withAuth: false
    });

    storage.setAuth(data);

    dispatch({
      type: actionType.SWITCH_AUTH_MODAL
    });

    dispatch({
      type: actionType.SIGNUP,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: actionType.UNAUTH_ERR,
      payload: (e && e.response && e.response.data) || null
    });
  }
};

export const logout = () => dispatch => {
  try {
    storage.removeAuth();

    dispatch({
      type: actionType.LOGOUT
    });
  } catch (e) {}
};

export const switchAuthModal = params => async dispatch => {
  dispatch({
    type: actionType.SWITCH_AUTH_MODAL,
    payload: params
  });
};
