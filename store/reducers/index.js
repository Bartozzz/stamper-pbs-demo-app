import { combineReducers } from "redux";
import auth from "./auth";
import map from "./map";
import profile from "./profile";
import stamp from "./stamp";
import wallet from "./wallet";
import prizes from "./prizes";
import review from "./review";

const reducers = {
  auth,
  map,
  profile,
  stamp,
  wallet,
  prizes,
  review,
};

export default combineReducers(reducers);
