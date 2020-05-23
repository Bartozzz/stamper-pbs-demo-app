import { AsyncStorage } from "react-native";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import Url from "../constants/Urls";
import Secret from "../constants/Secret";
import {
  EXPIRY_DATE,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  setExpiryDate,
  setAccessToken,
  setRefreshToken,
} from "../store/reducers/auth";

const client = axios.create({
  responseType: "json",
});

function authorizeApp() {
  return client.post(Url.Account.ApplicationToken(), {
    Application: Secret.Application,
    AuthorizationKey: Secret.AuthorizationKey,
  });
}

function authorizeUser(email, refreshtoken) {
  return authorizeApp().then((response) => {
    const { accessToken } = response.data;
    const data = { email, refreshtoken };

    console.log("Got fresh app access token…", accessToken);

    return client.post(Url.Account.RefreshToken(), data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });
}

const middleware = axiosMiddleware(client, {
  // not required, but use-full configuration option
  returnRejectedPromiseOnError: true,
  interceptors: {
    response: [
      {
        error: ({ getState, dispatch }, error) => {
          const originalRequest = error.config;

          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const { auth, profile } = getState();
            const { refreshToken } = auth;
            const { email } = profile;

            // The user is logged-in: we need to refresh the app access token,
            // then the user's access token:
            if (email && refreshToken) {
              console.log("Unauthorized – issuing new user access token…");

              return authorizeUser(email, refreshToken)
                .then(async (response) => {
                  const {
                    accessToken,
                    refreshToken,
                    expiryDate,
                  } = response.data;
                  const expirySec = (new Date(expiryDate) - new Date()) / 1000;

                  console.log("Issued a new access token…", response.data);
                  console.log("Token will expire in", expirySec);

                  // Update local persistent storage:
                  await AsyncStorage.setItem(EXPIRY_DATE, expiryDate);
                  await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
                  await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);

                  // Update local volatile storage:
                  dispatch(setExpiryDate(expiryDate));
                  dispatch(setAccessToken(accessToken));
                  dispatch(setRefreshToken(refreshToken));

                  originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                  console.log("Re-trying the request");
                  return client(originalRequest);
                })
                .catch((err) => {
                  console.log("Could not issue new access token…", err);
                  return Promise.reject(error);
                });
            } else {
              console.log("Unauthorized – issuing new app access token…");

              return authorizeApp()
                .then(async (response) => {
                  const { accessToken, expiryDate } = response.data;
                  const expirySec = (new Date(expiryDate) - new Date()) / 1000;

                  console.log("Issued a new access token…", response.data);
                  console.log("Token will expire in", expirySec);

                  originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                  console.log("Re-trying the request");
                  return client(originalRequest);
                })
                .catch((err) => {
                  console.log("Could not issue new access token…", err);
                  return Promise.reject(error);
                });
            }
          }

          return Promise.reject(error);
        },
      },
    ],
  },
});

export default client;
export { middleware };
