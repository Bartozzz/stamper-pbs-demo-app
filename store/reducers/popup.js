import Url from "../../constants/Urls";

// Actions
export const POPUP_REQUEST = "APP/POPUP/REQUEST";
export const POPUP_SUCCESS = "APP/POPUP/SUCCESS";
export const POPUP_FAIL = "APP/POPUP/FAIL";

export const initialState = {
  title: undefined,
  message: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case POPUP_FAIL:
    case POPUP_REQUEST:
      return {
        title: undefined,
        message: undefined,
      };
    case POPUP_SUCCESS:
      return {
        title: action.payload.data.title,
        message: action.payload.data.message,
      };
    default:
      return state;
  }
}

export const getPopUp = () => ({
  types: [POPUP_REQUEST, POPUP_SUCCESS, POPUP_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Info.GetNotifications(),
    },
  },
});
