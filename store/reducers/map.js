import Url from "../../constants/Urls";

// Actions
export const MAP_GET_REQUEST = "APP/MAP/GET_REQUEST";
export const MAP_GET_SUCCESS = "APP/MAP/GET_SUCCESS";
export const MAP_GET_FAIL = "APP/MAP/GET_FAIL";
export const MAP_FAV_REQUEST = "APP/MAP/FAV_REQUEST";
export const MAP_FAV_SUCCESS = "APP/MAP/FAV_SUCCESS";
export const MAP_FAV_FAIL = "APP/MAP/FAV_FAIL";
export const MAP_UNFAV_REQUEST = "APP/MAP/UNFAV_REQUEST";
export const MAP_UNFAV_SUCCESS = "APP/MAP/UNFAV_SUCCESS";
export const MAP_UNFAV_FAIL = "APP/MAP/UNFAV_FAIL";

const initialState = {
  isLoading: false,
  filters: [],
  data: []
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MAP_GET_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case MAP_GET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        filters: action.payload.data.filters,
        data: action.payload.data.cards
      };

    case MAP_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        fiters: [],
        data: []
      };

    case MAP_FAV_REQUEST: {
      const { cardId } = action.payload.request.data;

      return {
        ...state,
        data: state.data.map(card => {
          if (card.id === cardId) {
            return { ...card, favorite: true };
          } else {
            return card;
          }
        })
      };
    }

    case MAP_UNFAV_REQUEST: {
      const { cardId } = action.payload.request.data;

      return {
        ...state,
        data: state.data.map(card => {
          if (card.id === cardId) {
            return { ...card, favorite: false };
          } else {
            return card;
          }
        })
      };
    }

    default:
      return state;
  }
}

export const getRegion = (city, isoCountryCode, coords) => ({
  types: [MAP_GET_REQUEST, MAP_GET_SUCCESS, MAP_GET_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Region.Get(),
      data: {
        city,
        country: isoCountryCode,
        lat: coords.latitude,
        lng: coords.longitude
      }
    }
  }
});

export const addFav = cardId => ({
  types: [MAP_FAV_REQUEST, MAP_FAV_SUCCESS, MAP_FAV_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Favorite.Add(),
      data: {
        cardId
      }
    }
  }
});

export const removeFav = cardId => ({
  types: [MAP_UNFAV_REQUEST, MAP_UNFAV_SUCCESS, MAP_UNFAV_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Favorite.Remove(),
      data: {
        cardId
      }
    }
  }
});
