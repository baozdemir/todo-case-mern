import { actionType } from "./type";
import storage from "../../services/storage";

const auth = storage.getAuth();

const initialState = {
  alert: null,
  authModalVisibility: true,
  loading: false,
  isAuthenticated: (auth.token && auth.user && true) || false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionType.START:
      return {
        ...state,
        loading: true,
        alert: null
      };
    case actionType.LOGIN:
      return {
        ...state,
        mainText: "LOGGED IN!",
        loading: false,
        isAuthenticated: true,
        alert: null
      };
    case actionType.SIGNUP:
      return {
        ...state,
        mainText: "SIGNED UP!",
        loading: false,
        isAuthenticated: true,
        alert: null
      };

    case actionType.LOGOUT:
      return initialState;

    case actionType.UNAUTH_ERR:
      return {
        ...state,
        mainText: null,
        loading: false,
        isAuthenticated: false,
        alert: {
          message:
            (action.payload && action.payload.message) ||
            "Authentication Error",
          type: (action.payload && action.payload.type) || "authenticationError"
        }
      };
    case actionType.SWITCH_AUTH_MODAL:
      return {
        ...state,
        authModalVisibility: !state.authModalVisibility,
        authTab: action.payload,
        alert: null
      };
    default:
      return state;
  }
};
