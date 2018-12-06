// Keys ued for local storage:
export const QRDATA_URL = "qrdata_url";

// Actions
export const SET_URL = "APP/QR_DATA/SET_URL";
export const SET_QRC = "APP/QR_DATA/SET_QRC";
export const GET_DATA = "APP/QR_DATA/GET_DATA";
export const GET_DATA_FAIL = "APP/QR_DATA/GET_DATA_FAIL";
export const GET_DATA_SUCCESS = "APP/QR_DATA/GET_DATA_SUCCESS";

const initialState = {
  url: null,
  qrc: null,
  data: null,
  error: null,
  fetchingData: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_URL:
      return {
        ...state,
        url: action.payload.url
      };

    case SET_QRC:
      return {
        ...state,
        qrc: action.payload.qrc
      };

    case GET_DATA:
      return {
        ...state,
        data: [],
        error: null,
        fetchingData: true
      };

    case GET_DATA_FAIL:
      return {
        ...state,
        data: [],
        error: "Error while fetching QR Code data",
        fetchingData: false
      };

    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: null,
        fetchingData: false
      };

    default:
      return state;
  }
}

export const setUrl = url => ({
  type: SET_URL,
  payload: { url }
});

export const setQrc = qrc => ({
  type: SET_QRC,
  payload: { qrc }
});

export const getData = url => ({
  type: GET_DATA,
  payload: {
    request: {
      url
    }
  }
});
