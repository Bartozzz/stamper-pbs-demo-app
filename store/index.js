import { createStore, applyMiddleware } from "redux";
import { middleware as axiosMiddleware } from "./axios";
import rootReducer from "./reducers";

export const enhancer = applyMiddleware(
  // Add more middlewares here if needed:
  axiosMiddleware
);

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
