import Url from "../../constants/Urls";

// Keys used for local storage:
export const PRIZES_CARDS = "PRIZES_CARDS";
export const FORCE_REFRESH_PRIZES = "FORCE_REFRESH_PRIZES";

// Actions
export const PRIZES_RESTORE = "APP/PRIZES/RESTORE";
export const PRIZES_GET_REQUEST = "APP/PRIZES/GET_REQUEST";
export const PRIZES_GET_SUCCESS = "APP/PRIZES/GET_SUCCESS";
export const PRIZES_GET_FAIL = "APP/PRIZES/GET_FAIL";
export const PRIZES_GET_COUNT_REQUEST = "APP/PRIZES_COUNT/GET_REQUEST";
export const PRIZES_GET_COUNT_SUCCESS = "APP/PRIZES_COUNT/GET_SUCCESS";
export const PRIZES_GET_COUNT_FAIL = "APP/PRIZES_COUNT/GET_FAIL";

export const PRIZES_GET_DISCOUNT_REQUEST = "APP/PRIZES_DISCOUNT/GET_REQUEST";
export const PRIZES_GET_DISCOUNT_SUCCESS = "APP/PRIZES_DISCOUNT/GET_SUCCESS";
export const PRIZES_GET_DISCOUNT_FAIL = "APP/PRIZES_DISCOUNT/GET_FAIL";

const initialState = {
  isLoading: false,
  count: 0,
  prizes: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PRIZES_GET_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PRIZES_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        prizes: action.payload.data.cards,
      };

    case PRIZES_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        prizes: [],
      };

    case PRIZES_GET_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload.data,
      };

    case PRIZES_RESTORE: {
      return {
        ...state,
        prizes: action.payload.cards,
      };
    }

    default:
      return state;
  }
}

export const restorePrizes = (payload) => ({
  type: PRIZES_RESTORE,
  payload: {
    cards: payload.cards,
  },
});

export const getPrizes = () => ({
  types: [PRIZES_GET_REQUEST, PRIZES_GET_SUCCESS, PRIZES_GET_FAIL],
  payload: {
    request: {
      url: Url.Rewards.Get(),
    },
  },
});

export const getPrizesCount = () => ({
  types: [
    PRIZES_GET_COUNT_REQUEST,
    PRIZES_GET_COUNT_SUCCESS,
    PRIZES_GET_COUNT_FAIL,
  ],
  payload: {
    request: {
      url: Url.Rewards.Count(),
    },
  },
});

export const getDiscountCode = (cardId, providerId) => ({
  types: [
    PRIZES_GET_DISCOUNT_REQUEST,
    PRIZES_GET_DISCOUNT_SUCCESS,
    PRIZES_GET_DISCOUNT_FAIL,
  ],
  payload: {
    request: {
      method: "POST",
      url: Url.Rewards.GetDiscountCode(),
      data: {
        cardId,
        providerId,
      },
    },
  },
});
