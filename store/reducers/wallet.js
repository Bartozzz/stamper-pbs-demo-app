import Url from "../../constants/Urls";

// Actions
export const WALLET_GET_REQUEST = "APP/WALLET/GET_REQUEST";
export const WALLET_GET_SUCCESS = "APP/WALLET/GET_SUCCESS";
export const WALLET_GET_FAIL = "APP/WALLET/GET_FAIL";

const initialState = {
  isLoading: false,
  cards: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case WALLET_GET_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case WALLET_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        cards: action.payload.data.cards
      };

    case WALLET_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        cards: []
      };

    default:
      return state;
  }
}

export const getWallet = () => ({
  types: [WALLET_GET_REQUEST, WALLET_GET_SUCCESS, WALLET_GET_FAIL],
  payload: {
    request: {
      url: Url.Wallet.Get()
    }
  }
});
