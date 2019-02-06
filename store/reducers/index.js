import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import qrdata from "./qrdata";
import stamp from "./stamp";

const reducers = {
  auth,
  profile,
  qrdata,
  stamp
};

export default combineReducers(reducers);
