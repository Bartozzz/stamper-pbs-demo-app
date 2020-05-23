import { Platform } from "react-native";
import Rollbar from "rollbar/src/react-native/rollbar";
import { getEnv } from "../env";

const rollbar = new Rollbar({
  accessToken: "a0e890289a3442e0870d27aa59240c2d",

  captureUncaught: true,
  captureUnhandledRejections: true,
  captureDeviceInfo: true,

  environment: getEnv(),
  platform: Platform.OS,
});

export default function useRollbar() {
  return rollbar;
}
