import { AsyncStorage } from "react-native";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import Url, { publicUrls } from "../constants/Urls";
import {
  EXPIRY_DATE,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  setExpiryDate,
  setAccessToken,
  setRefreshToken
} from "../store/reducers/auth";

const client = axios.create({
  responseType: "json"
});

const middleware = axiosMiddleware(client, {
  // not required, but use-full configuration option
  returnRejectedPromiseOnError: true,
  interceptors: {
    request: [
      ({ getState, dispatch }, response) => {
        // If the url is public, i.e. doesn't require the Authorization header,
        // then just execute the request:
        if (publicUrls.includes(response.url)) {
          return Promise.resolve(response);
        }

        const { auth, profile } = getState();
        const refreshToken = auth.refreshToken;
        const expiryDate = auth.expiryDate;
        const email = profile.email;

        let originalRequest = response;
        let tokenIsExpired = new Date(expiryDate) < new Date();

        // New access tokens should be issued only if the current one is expired
        // AND we have the user's email & refresh token:
        if (tokenIsExpired && email && refreshToken) {
          console.log("Token expired… Generating a new access token:");

          return client
            .post(Url.Account.RefreshToken(), {
              email: email,
              refreshtoken: refreshToken
            })
            .then(async response => {
              console.log("Issued a new access token…");
              const { accessToken, refreshToken, expiryDate } = response.data;

              // Update local persistent storage:
              await AsyncStorage.setItem(EXPIRY_DATE, expiryDate);
              await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
              await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);

              // Update local volatile storage:
              dispatch(setExpiryDate(expiryDate));
              dispatch(setAccessToken(accessToken));
              dispatch(setRefreshToken(refreshToken));

              originalRequest["Authorization"] = `Bearer ${accessToken}`;

              return Promise.resolve(originalRequest);
            })
            .catch(err => {
              console.log("Could not issue new access token…");
              return Promise.reject(originalRequest);
            });
        }

        return Promise.resolve(response);
      }
    ]
  }
});

export default client;
export { middleware };
