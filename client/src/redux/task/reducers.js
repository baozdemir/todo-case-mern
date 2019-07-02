import {
  FETCH_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  ERROR_TASK
} from "./type";

const initialState = {
  alert: null,
  list: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, list: action.payload };
    case ADD_TASK:
      return {
        ...state,
        list: [action.payload, ...state.list]
      };
    case UPDATE_TASK:
      return {
        ...state,
        list: state.list.map(todo =>
          todo._id === action.payload._id ? action.payload : todo
        )
      };
    case DELETE_TASK:
      return {
        ...state,
        list: state.list.filter(todo => todo._id !== action.payload._id)
      };
    case ERROR_TASK:
      return {
        ...state,
        alert: {
          message:
            (action.payload && action.payload.message) || "TODO fetch error",
          type: (action.payload && action.payload.type) || "todoFetchError"
        }
      };
    default:
      return state;
  }
}
