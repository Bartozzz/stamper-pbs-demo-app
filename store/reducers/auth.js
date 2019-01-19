// Keys used for local storage:
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

// Actions
export const LOGIN_REQUEST = "APP/AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "APP/AUTH/LOGIN_SUCCESS";
export const LOGIN_FAIL = "APP/AUTH/LOGIN_FAIL";
export const REGISTER_REQUEST = "APP/AUTH/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "APP/AUTH/REGISTER_SUCCESS";
export const REGISTER_FAIL = "APP/AUTH/REGISTER_FAIL";
export const LOGOUT_REQUEST = "APP/AUTH/LOGOUT_REQUEST";

const initialState = {
  fetchingData: false,
  accessToken: null,
  refreshToken: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        fetchingData: true
      };

    case LOGOUT_REQUEST:
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

export const login = () => ({
  type: LOGIN_REQUEST,
  payload: {
    request: {
      url: "http://google.com"
    }
  }
});

export const register = () => ({
  type: REGISTER_REQUEST,
  payload: {
    request: {
      url: "http://google.com"
    }
  }
});

export const logout = () => ({
  type: LOGOUT_REQUEST
});
