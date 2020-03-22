import Constants from "expo-constants";
import { Platform } from "react-native";

const ENV = {
  staging: {
    apiUrl: "https://stamper-mobile-api-users-staging.azurewebsites.net",
    facebookAppId: "356151625034848",
    googleClientId: Platform.select({
      ios:
        "664764542609-dm39ujqp7hvebhcanqpbtkt3342ffr3l.apps.googleusercontent.com",
      android:
        "664764542609-e79dr8nrbjsutidf2ujpam8ti8nivu6p.apps.googleusercontent.com"
    })
  },

  production: {
    apiUrl: "https://app.getstamper.com",
    facebookAppId: "356151625034848",
    googleClientId: Platform.select({
      ios:
        "664764542609-o4r5a6sbj6av965qv6708p6mvm0aj6si.apps.googleusercontent.com",
      android:
        "664764542609-hnmmq5p12fc19efikv023lhm4i8bct6k.apps.googleusercontent.com"
    })
  }
};

export const getEnv = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return "development";
  }

  if (env === "staging" || env.startsWith("feature")) {
    return "staging";
  }

  return "production";
};

const getEnvVariables = (env = Constants.manifest.releaseChannel) => {
  switch (getEnv(env)) {
    case "staging":
    case "development":
      return ENV.staging;

    case "production":
      return ENV.production;
  }
};

console.log(`Current app environment: ${getEnv()}`);
console.log(`Current remote API URL: ${getEnvVariables().apiUrl}`);

export default getEnvVariables;
