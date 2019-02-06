import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import qrdata from "./qrdata";
import stamp from "./stamp";
import wallet from "./wallet";

const reducers = {
  auth,
  profile,
  qrdata,
  stamp,
  wallet
};

export default combineReducers(reducers);
