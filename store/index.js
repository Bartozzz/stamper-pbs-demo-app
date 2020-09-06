import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import { middleware as axiosMiddleware } from "./axios";
import rootReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth", "profile", "wallet", "prizes", "review"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const enhancer = applyMiddleware(
  // Add more middlewares here if needed:
  axiosMiddleware
);

const store = createStore(persistedReducer, enhancer);

const persistor = persistStore(store);

export { store, persistor };
