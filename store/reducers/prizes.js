import Url from "../../constants/Urls";

// Actions
export const PRIZES_GET_REQUEST = "APP/PRIZES/GET_REQUEST";
export const PRIZES_GET_SUCCESS = "APP/PRIZES/GET_SUCCESS";
export const PRIZES_GET_FAIL = "APP/PRIZES/GET_FAIL";
export const PRIZES_GET_COUNT_REQUEST = "APP/PRIZES_COUNT/GET_REQUEST";
export const PRIZES_GET_COUNT_SUCCESS = "APP/PRIZES_COUNT/GET_SUCCESS";
export const PRIZES_GET_COUNT_FAIL = "APP/PRIZES_COUNT/GET_FAIL";

const initialState = {
  isLoading: false,
  prizes: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PRIZES_GET_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case PRIZES_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        prizes: action.payload.data.cards
      };

    case PRIZES_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        prizes: []
      };

    default:
      return state;
  }
}

export const getPrizes = () => ({
  types: [PRIZES_GET_REQUEST, PRIZES_GET_SUCCESS, PRIZES_GET_FAIL],
  payload: {
    request: {
      url: Url.Rewards.Get()
    }
  }
});

export const getPrizesCount = () => ({
  types: [
    PRIZES_GET_COUNT_REQUEST,
    PRIZES_GET_COUNT_SUCCESS,
    PRIZES_GET_COUNT_FAIL
  ],
  payload: {
    request: {
      url: Url.Rewards.Count()
    }
  }
});
