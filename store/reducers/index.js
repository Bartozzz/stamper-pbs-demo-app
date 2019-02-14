import { combineReducers } from "redux";
import auth from "./auth";
import map from "./map";
import profile from "./profile";
import qrdata from "./qrdata";
import stamp from "./stamp";
import wallet from "./wallet";
import prizes from "./prizes";

const reducers = {
  auth,
  map,
  profile,
  qrdata,
  stamp,
  wallet,
  prizes
};

export default combineReducers(reducers);
