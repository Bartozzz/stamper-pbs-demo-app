import Url from "../../constants/Urls";

// Keys used for local storage:
export const EMAIL = "email";

// Actions
export const PROFILE_GET_REQUEST = "APP/PROFILE/GET_REQUEST";
export const PROFILE_GET_SUCCESS = "APP/PROFILE/GET_SUCCESS";
export const PROFILE_GET_FAIL = "APP/PROFILE/GET_FAIL";
export const PROFILE_UPDATE_REQUEST = "APP/PROFILE/UPDATE_REQUEST";
export const PROFILE_UPDATE_SUCCESS = "APP/PROFILE/UPDATE_SUCCESS";
export const PROFILE_UPDATE_FAIL = "APP/PROFILE/UPDATE_FAIL";
export const PROFILE_SET_EMAIL = "APP/PROFILE/SET_EMAIL";

const initialState = {
  nickname: null,
  firstname: null,
  lastname: null,
  email: null,
  photo: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PROFILE_GET_SUCCESS:
      // case PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        nickname: action.payload.data.nickname,
        firstname: action.payload.data.firstname,
        lastname: action.payload.data.lastname,
        email: action.payload.data.email,
        photo: action.payload.data.photo
      };

    case PROFILE_SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    default:
      return state;
  }
}

export const getProfile = () => ({
  types: [PROFILE_GET_REQUEST, PROFILE_GET_SUCCESS, PROFILE_GET_FAIL],
  payload: {
    request: {
      url: Url.Account.GetProfile()
    }
  }
});

export const setEmail = email => ({
  type: PROFILE_SET_EMAIL,
  payload: email
});
