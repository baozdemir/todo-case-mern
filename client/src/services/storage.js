import { keys } from "./constants";

const tryParse = item => {
  try {
    return JSON.parse(item);
  } catch (e) {
    return false;
  }
};

class Storage {
  constructor() {
    this.localStorage = window.localStorage;
  }

  getItem(item) {
    return this.localStorage.getItem(item);
  }

  setItem(key, value) {
    this.localStorage.setItem(key, value);
  }

  removeItem(key) {
    this.localStorage.removeItem(key);
  }

  getToken() {
    return tryParse(this.getItem(keys.Token));
  }

  setToken(token) {
    this.setItem(keys.Token, JSON.stringify(token));
  }

  removeToken() {
    this.removeItem(keys.Token);
  }

  getUser() {
    return tryParse(this.getItem(keys.User));
  }

  setUser(user) {
    this.setItem(keys.User, JSON.stringify(user));
  }

  removeUser() {
    this.removeItem(keys.User);
  }

  getAuth() {
    return {
      token: this.getToken(),
      user: this.getUser()
    };
  }

  setAuth(data) {
    this.setUser(data.user);
    this.setToken(data.token);
  }

  removeAuth() {
    this.removeUser();
    this.removeToken();
  }
}

export default new Storage();
