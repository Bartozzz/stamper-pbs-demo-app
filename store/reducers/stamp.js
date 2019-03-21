import Url from "../../constants/Urls";

// Actions
export const STAMP_ADD_REQUEST = "APP/STAMP/ADD_REQUEST";
export const STAMP_ADD_SUCCESS = "APP/STAMP/ADD_SUCCESS";
export const STAMP_ADD_FAIL = "APP/STAMP/ADD_FAIL";

const initialState = {
  isAdding: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case STAMP_ADD_REQUEST:
      return {
        ...state,
        isAdding: true
      };

    case STAMP_ADD_SUCCESS:
    case STAMP_ADD_FAIL:
      return {
        ...state,
        isAdding: false
      };

    default:
      return state;
  }
}

export const addStamp = code => ({
  types: [STAMP_ADD_REQUEST, STAMP_ADD_SUCCESS, STAMP_ADD_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Stamp.Add(),
      data: {
        code
      }
    }
  }
});
