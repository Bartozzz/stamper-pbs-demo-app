import Url from "../../constants/Urls";
import Secret from "../../constants/Secret";
import axios from "../axios";

// Keys used for local storage:
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

// Actions
export const SET_ACCESS_TOKEN = "app/AUTH/SET/ACCESS_TOKEN";
export const SET_REFRESH_TOKEN = "app/AUTH/SET/REFRESH_TOKEN";
export const ACCESS_REQUEST = "APP/AUTH/ACCESS_REQUEST";
export const ACCESS_SUCCESS = "APP/AUTH/ACCESS_SUCCESS";
export const ACCESS_FAIL = "APP/AUTH/ACCESS_FAIL";
export const LOGIN_REQUEST = "APP/AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "APP/AUTH/LOGIN_SUCCESS";
export const LOGIN_FAIL = "APP/AUTH/LOGIN_FAIL";
export const REGISTER_REQUEST = "APP/AUTH/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "APP/AUTH/REGISTER_SUCCESS";
export const REGISTER_FAIL = "APP/AUTH/REGISTER_FAIL";
export const LOGOUT_REQUEST = "APP/AUTH/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "APP/AUTH/LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "APP/AUTH/LOGOUT_FAIL";

const initialState = {
  fetchingData: false,
  appToken: null,
  accessToken: null,
  refreshToken: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ACCESS_TOKEN:
      const header = `Bearer ${action.payload}`;

      // Required in all other endpoints:
      axios.defaults.headers.common["Authorization"] = header;

      return {
        ...state,
        accessToken: action.payload
      };

    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload
      };

    case ACCESS_REQUEST:
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        fetchingData: true
      };

    case ACCESS_REQUEST:
      return {
        ...state,
        appToken: null
      };

    case ACCESS_SUCCESS:
      const token = action.payload.data.accessToken;
      const header = `Bearer ${token}`;

      // Set app access token for further usage.
      // Required in all other endpoints:
      axios.defaults.headers.common["Authorization"] = header;

      return {
        ...state,
        appToken: token
      };

    case LOGOUT_REQUEST:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        fetchingData: false,
        accessToken: null,
        refreshToken: null
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken
      };

    default:
      return state;
  }
}

export const authorize = () => ({
  types: [ACCESS_REQUEST, ACCESS_SUCCESS, ACCESS_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.ApplicationToken(),
      data: {
        Application: Secret.Application,
        AuthorizationKey: Secret.AuthorizationKey
      }
    }
  }
});

export const login = (email, password) => ({
  types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.Login(),
      data: {
        email,
        password
      }
    }
  }
});

export const register = (email, password, nickname) => ({
  types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.Register(),
      data: {
        email,
        password,
        nickname
      }
    }
  }
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
  payload: {
    request: {
      method: "POST",
      url: Url.Account.Logout()
    }
  }
});

export const setAccessToken = accessToken => ({
  type: SET_ACCESS_TOKEN,
  payload: accessToken
});

export const setRefreshToken = refreshToken => ({
  type: SET_REFRESH_TOKEN,
  payload: refreshToken
});
