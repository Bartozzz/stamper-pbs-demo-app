import Url from "../../constants/Urls";
import Secret from "../../constants/Secret";
import i18n from "../../translations";
import axios from "../axios";

// Keys used for local storage:
export const EXPIRY_DATE = "expiry_date";
export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";

// Actions
export const SET_EXPIRY_DATE = "APP/AUTH/SET/EXPIRY_DATE";
export const SET_ACCESS_TOKEN = "APP/AUTH/SET/ACCESS_TOKEN";
export const SET_REFRESH_TOKEN = "APP/AUTH/SET/REFRESH_TOKEN";
export const ACCESS_REQUEST = "APP/AUTH/ACCESS_REQUEST";
export const ACCESS_SUCCESS = "APP/AUTH/ACCESS_SUCCESS";
export const ACCESS_FAIL = "APP/AUTH/ACCESS_FAIL";
export const LOGIN_REQUEST = "APP/AUTH/LOGIN_REQUEST";
export const LOGIN_SUCCESS = "APP/AUTH/LOGIN_SUCCESS";
export const LOGIN_FAIL = "APP/AUTH/LOGIN_FAIL";
export const NOTIFICATIONSTOKEN_REQUEST = "APP/AUTH/NOTIFICATIONSTOKEN_REQUEST";
export const NOTIFICATIONSTOKEN_SUCCESS = "APP/AUTH/NOTIFICATIONSTOKEN_SUCCESS";
export const NOTIFICATIONSTOKEN_FAIL = "APP/AUTH/NOTIFICATIONSTOKEN_FAIL";
export const REGISTER_REQUEST = "APP/AUTH/REGISTER_REQUEST";
export const REGISTER_SUCCESS = "APP/AUTH/REGISTER_SUCCESS";
export const REGISTER_FAIL = "APP/AUTH/REGISTER_FAIL";
export const LOGOUT_REQUEST = "APP/AUTH/LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "APP/AUTH/LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "APP/AUTH/LOGOUT_FAIL";
export const CHANGE_PASSWORD_REQUEST = "APP/AUTH/CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "APP/AUTH/CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAIL = "APP/AUTH/CHANGE_PASSWORD_FAIL";

const initialState = {
  fetchingData: false,
  appToken: null,
  appTokenExpiryDate: null,
  expiryDate: null,
  accessToken: null,
  refreshToken: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EXPIRY_DATE:
      return {
        ...state,
        expiryDate: action.payload,
      };

    case SET_ACCESS_TOKEN: {
      const header = `Bearer ${action.payload}`;

      // Required in all other endpoints:
      axios.defaults.headers.common.Authorization = header;

      return {
        ...state,
        accessToken: action.payload,
      };
    }

    case SET_REFRESH_TOKEN:
      return {
        ...state,
        refreshToken: action.payload,
      };

    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        fetchingData: true,
      };

    case ACCESS_REQUEST: {
      console.log("Requesting new app access token…");

      return {
        ...state,
        appToken: null,
      };
    }

    case ACCESS_SUCCESS: {
      const { accessToken, expiryDate } = action.payload.data;
      const header = `Bearer ${accessToken}`;
      const expiry = (new Date(expiryDate) - new Date()) / 1000;

      console.log("Got new new app access token… Expiring in:", expiry);

      // Set app access token for further usage.
      // Required in all other endpoints:
      axios.defaults.headers.common.Authorization = header;

      return {
        ...state,
        appToken: accessToken,
        appTokenExpiryDate: expiryDate,
      };
    }

    case LOGOUT_REQUEST:
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        fetchingData: false,
        expiryDate: null,
        accessToken: null,
        refreshToken: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS: {
      const expiryDate = action.payload.data.expiryDate;
      const accessToken = action.payload.data.accessToken;
      const refreshToken = action.payload.data.refreshToken;
      const header = `Bearer ${accessToken}`;

      // Required in all other endpoints:
      axios.defaults.headers.common.Authorization = header;

      return {
        ...state,
        fetchingData: false,
        expiryDate: expiryDate,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    }

    // case CHANGE_PASSWORD_REQUEST: {
    //   axios.defaults.headers.common["Authorization"] = state.appToken;
    //
    //   return {
    //     ...state,
    //     expiryDate: null,
    //     accessToken: null,
    //     refreshToken: null
    //   };
    // }

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
        AuthorizationKey: Secret.AuthorizationKey,
      },
    },
  },
});

export const login = (email, password) => ({
  types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.Login(),
      data: {
        email,
        password,
        language: i18n.appLocale,
      },
    },
  },
});

export const loginExternal = (email) => ({
  types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.ExternalLogin(),
      data: {
        email,
        language: i18n.appLocale,
      },
    },
  },
});

export const loginApple = (identityToken) => ({
  types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.AppleLogin(),
      data: {
        identityToken,
        language: i18n.appLocale,
      },
    },
  },
});

export const setNotificationsToken = (token) => ({
  types: [
    NOTIFICATIONSTOKEN_REQUEST,
    NOTIFICATIONSTOKEN_SUCCESS,
    NOTIFICATIONSTOKEN_FAIL,
  ],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.SetNotificationsToken(),
      data: {
        deviceId: token,
        language: i18n.appLocale,
      },
    },
  },
});

export const getNotificationsToken = () => ({
  types: [
    NOTIFICATIONSTOKEN_REQUEST,
    NOTIFICATIONSTOKEN_SUCCESS,
    NOTIFICATIONSTOKEN_FAIL,
  ],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.GetNotificationsToken(),
    },
  },
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
        nickname,
        language: i18n.appLocale,
      },
    },
  },
});

export const registerExternal = (email, provider, nickname) => ({
  types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.ExternalRegister(),
      data: {
        email,
        provider,
        nickname,
        language: i18n.appLocale,
      },
    },
  },
});

export const registerApple = (email, identityToken, nickname) => ({
  types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.AppleRegister(),
      data: {
        email,
        identityToken,
        nickname,
        language: i18n.appLocale,
      },
    },
  },
});

export const logout = () => ({
  type: LOGOUT_REQUEST,
  payload: {
    request: {
      method: "POST",
      url: Url.Account.Logout(),
    },
  },
});

export const changePassword = (Current, NewPassword, ConfirmNewPassword) => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: {
    request: {
      method: "POST",
      url: Url.Account.ChangePassword(),
      data: {
        CurrentPassword: Current,
        NewPassword,
        ConfirmNewPassword,
        language: i18n.appLocale,
      },
    },
  },
});

export const resetPassword = (email) => ({
  type: "noop",
  payload: {
    request: {
      method: "POST",
      url: Url.Account.ForgotPassword(),
      data: {
        email,
        language: i18n.appLocale,
      },
    },
  },
});

export const setExpiryDate = (expiryDate) => ({
  type: SET_EXPIRY_DATE,
  payload: expiryDate,
});

export const setAccessToken = (accessToken) => ({
  type: SET_ACCESS_TOKEN,
  payload: accessToken,
});

export const setRefreshToken = (refreshToken) => ({
  type: SET_REFRESH_TOKEN,
  payload: refreshToken,
});
