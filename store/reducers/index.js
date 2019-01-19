import { combineReducers } from "redux";
import auth from "./auth";
import qrdata from "./qrdata";

const reducers = {
  auth,
  qrdata
};

export default combineReducers(reducers);
