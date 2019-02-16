import Url from "../../constants/Urls";

// Actions
export const WALLET_GET_REQUEST = "APP/WALLET/GET_REQUEST";
export const WALLET_GET_SUCCESS = "APP/WALLET/GET_SUCCESS";
export const WALLET_GET_FAIL = "APP/WALLET/GET_FAIL";
export const WALLET_ADD_CARD_REQUEST = "APP/WALLET/ADD_CARD_REQUEST";
export const WALLET_ADD_CARD_SUCCESS = "APP/WALLET/ADD_CARD_SUCCESS";
export const WALLET_ADD_CARD_FAIL = "APP/WALLET/ADD_CARD_FAIL";
export const WALLET_REMOVE_CARD_REQUEST = "APP/WALLET/REMOVE_CARD_REQUEST";
export const WALLET_REMOVE_CARD_SUCCESS = "APP/WALLET/REMOVE_CARD_SUCCESS";
export const WALLET_REMOVE_CARD_FAIL = "APP/WALLET/REMOVE_CARD_FAIL";

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

    case WALLET_REMOVE_CARD_REQUEST: {
      const { cardId } = action.payload.request.data;

      return {
        ...state,
        cards: state.cards.filter(card => card.id !== cardId)
      };
    }

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

export const addCard = cardId => ({
  types: [
    WALLET_ADD_CARD_REQUEST,
    WALLET_ADD_CARD_SUCCESS,
    WALLET_ADD_CARD_FAIL
  ],
  payload: {
    request: {
      method: "POST",
      url: Url.Card.Add(),
      data: {
        cardId
      }
    }
  }
});

export const removeCard = cardId => ({
  types: [
    WALLET_REMOVE_CARD_REQUEST,
    WALLET_REMOVE_CARD_SUCCESS,
    WALLET_REMOVE_CARD_FAIL
  ],
  payload: {
    request: {
      method: "POST",
      url: Url.Card.Remove(),
      data: {
        cardId
      }
    }
  }
});
