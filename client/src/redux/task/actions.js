import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TOGGLE_TAB,
  ERROR_TASK
} from "./type";
import apiCall from "../../services/api";

export const fetchTasks = () => async dispatch => {
  try {
    const { data } = await apiCall({
      url: "/task",
      method: "GET",
      withAuth: true
    });
    dispatch({
      type: FETCH_TASKS,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: ERROR_TASK,
      payload: (e && e.response && e.response.data) || null
    });
  }
};

export const addTask = payload => async dispatch => {
  try {
    const { data } = await apiCall({
      url: "/task",
      method: "POST",
      data: payload,
      withAuth: true
    });

    dispatch({
      type: ADD_TASK,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: ERROR_TASK,
      payload: (e && e.response && e.response.data) || null
    });
  }
};

export const updateTask = payload => async dispatch => {
  try {
    const { data } = await apiCall({
      url: "/task",
      method: "POST",
      data: payload,
      withAuth: true
    });
    dispatch({
      type: UPDATE_TASK,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: ERROR_TASK,
      payload: (e && e.response && e.response.data) || null
    });
  }
};

export const deleteTask = id => async dispatch => {
  try {
    const { data } = await apiCall({
      url: "/task/" + id,
      method: "DELETE",
      withAuth: true
    });

    dispatch({
      type: DELETE_TASK,
      payload: data
    });
  } catch (e) {
    dispatch({
      type: ERROR_TASK,
      payload: (e && e.response && e.response.data) || null
    });
  }
};

// actually it't not using yet
export const toggleTab = tab => async dispatch => {
  dispatch({ type: TOGGLE_TAB, filter: tab });
};
