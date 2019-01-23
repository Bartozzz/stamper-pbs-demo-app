import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

const client = axios.create({
  responseType: "json"
});

const middleware = axiosMiddleware(client);

export default client;
export { middleware };
