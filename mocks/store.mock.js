import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import configureMockStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";

export const mockAxiosClient = axios.create({
  responseType: "json",
});

export const mockApi = new MockAdapter(mockAxiosClient);

export const mockStore = configureMockStore([
  axiosMiddleware(mockAxiosClient, {
    // not required, but use-full configuration option
    returnRejectedPromiseOnError: true,
  }),
]);
