import { combineReducers } from "redux";
import auth from "./auth";
import map from "./map";
import profile from "./profile";
import stamp from "./stamp";
import wallet from "./wallet";
import prizes from "./prizes";
import review from "./review";
import popup from "./popup";
import quiz from "./quiz";

const reducers = {
  auth,
  map,
  profile,
  stamp,
  wallet,
  prizes,
  review,
  popup,
  quiz,
};

export default combineReducers(reducers);
