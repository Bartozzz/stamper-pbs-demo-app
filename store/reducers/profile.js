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
export const PHOTO_UPDATE_REQUEST = "APP/PHOTO/UPDATE_REQUEST";
export const PHOTO_UPDATE_SUCCESS = "APP/PHOTO/UPDATE_SUCCESS";
export const PHOTO_UPDATE_FAIL = "APP/PHOTO/UPDATE_FAIL";
export const PROFILE_SET_NICKNAME = "APP/PROFILE/SET_NICKNAME";
export const PROFILE_SET_FIRSTNAME = "APP/PROFILE/SET_FIRSTNAME";
export const PROFILE_SET_LASTNAME = "APP/PROFILE/SET_LASTNAME";
export const PROFILE_SET_EMAIL = "APP/PROFILE/SET_EMAIL";
export const PROFILE_SET_PHOTO = "APP/PROFILE/SET_PHOTO";

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
      return {
        ...state,
        nickname: action.payload.data.nickname,
        firstname: action.payload.data.firstname,
        lastname: action.payload.data.lastname,
        email: action.payload.data.email,
        photo: action.payload.data.photo
      };

    case PROFILE_SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload
      };

    case PROFILE_SET_FIRSTNAME:
      return {
        ...state,
        firstname: action.payload
      };

    case PROFILE_SET_LASTNAME:
      return {
        ...state,
        lastname: action.payload
      };

    case PROFILE_SET_EMAIL:
      return {
        ...state,
        email: action.payload
      };

    case PROFILE_SET_PHOTO:
      return {
        ...state,
        photo: action.payload
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

export const updateProfile = (
  Nickname,
  Firstname,
  Lastname,
  Email,
  Newsletter
) => ({
  types: [PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.UpdateProfile(),
      data: {
        Nickname,
        Firstname,
        Lastname,
        Email,
        Newsletter
      }
    }
  }
});

export const updatePhoto = Photo => ({
  types: [PHOTO_UPDATE_REQUEST, PHOTO_UPDATE_SUCCESS, PHOTO_UPDATE_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Account.UpdatePhoto(),
      data: {
        Photo
      }
    }
  }
});

export const setNickname = nickname => ({
  type: PROFILE_SET_NICKNAME,
  payload: nickname
});

export const setFirstname = firstname => ({
  type: PROFILE_SET_FIRSTNAME,
  payload: firstname
});

export const setLastname = lastname => ({
  type: PROFILE_SET_LASTNAME,
  payload: lastname
});

export const setEmail = email => ({
  type: PROFILE_SET_EMAIL,
  payload: email
});

export const setPhoto = photo => ({
  type: PROFILE_SET_PHOTO,
  payload: photo
});
