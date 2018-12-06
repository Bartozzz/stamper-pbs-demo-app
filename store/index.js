import { createStore, applyMiddleware } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import axios from "axios";
import rootReducer from "./reducers";

export const client = axios.create({
  responseType: "json"
});

export const enhancer = applyMiddleware(
  // Add more middlewares here if needed:
  axiosMiddleware(client)
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
