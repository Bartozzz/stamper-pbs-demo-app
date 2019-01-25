import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import qrdata from "./qrdata";

const reducers = {
  auth,
  profile,
  qrdata
};

export default combineReducers(reducers);
