import Url from "../../constants/Urls";

// Actions
export const MAP_GET_REQUEST = "APP/MAP/GET_REQUEST";
export const MAP_GET_SUCCESS = "APP/MAP/GET_SUCCESS";
export const MAP_GET_FAIL = "APP/MAP/GET_FAIL";

const initialState = {
  isLoading: false,
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
        data: action.payload.data.cards
      };

    case MAP_GET_FAIL:
      return {
        ...state,
        isLoading: false,
        data: []
      };

    default:
      return state;
  }
}

export const getRegion = city => ({
  types: [MAP_GET_REQUEST, MAP_GET_SUCCESS, MAP_GET_FAIL],
  payload: {
    request: {
      method: "POST",
      url: Url.Region.Get(),
      data: {
        city
      }
    }
  }
});
