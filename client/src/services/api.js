import axios from "axios";
import storage from "./storage";
import { HTTP, endPoint } from "./constants";
import store from "../store";
import { actionType } from "../redux/authentication/type";

const getToken = async () => {
  const jwt = await storage.getAuth();

  if (jwt.token && jwt.user) {
    return jwt.token;
  }
  return null;
};

const apiCall = async payload => {
  const {
    url = "",
    data,
    method = HTTP.GET,
    headers = {},
    options = {},
    withAuth = true
  } = payload;

  let token = null;
  if (withAuth) {
    token = await getToken();
  }

  return axios({
    url: `${endPoint}${url}`,
    data,
    method,
    headers: {
      ...headers,
      Authorization: `Bearer ${withAuth ? token : ""}`
    },
    ...options
  });
};

axios.interceptors.response.use(
  response => response,
  error => {
    if (!error.response || error.response.status === 401) {
      store.dispatch({ type: actionType.UNAUTH_ERR });
    }

    return Promise.reject(error);
  }
);

export default apiCall;
