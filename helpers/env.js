import Constants from "expo-constants";
import { Platform } from "react-native";

const ENV = {
  staging: {
    apiUrl: "https://stamper-mobile-api-users-staging.azurewebsites.net",
    facebookAppId: "230031908097780",
    googleClientId: Platform.select({
      ios:
        "1083137618823-qse3mci4ig0t9ji9i255k117pa7tg3td.apps.googleusercontent.com",
      android:
        "1083137618823-7naukb8qdbqjf9sc91jkloogn773965u.apps.googleusercontent.com",
    }),
  },

  production: {
    apiUrl: "https://app.getstamper.com",
    facebookAppId: "230031908097780",
    googleClientId: Platform.select({
      ios:
        "1083137618823-jjutii8verfihrinjefns1rk7ifsas6o.apps.googleusercontent.com",
      android:
        "1083137618823-i2n9ulgor4v6sst7t41iisrglivs47ch.apps.googleusercontent.com",
    }),
  },
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
