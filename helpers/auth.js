import { Facebook, Google, Constants } from "expo";
import { Platform } from "react-native";

let FACEBOOK_APP_ID;
let GOOGLE_CLIENT_ID;

if (__DEV__) {
  FACEBOOK_APP_ID = Platform.select({
    ios: Constants.manifest.extra.ios.FACEBOOK_APP_ID_DEV,
    android: Constants.manifest.extra.android.FACEBOOK_APP_ID_DEV
  });

  GOOGLE_CLIENT_ID = Platform.select({
    ios: Constants.manifest.extra.ios.GOOGLE_CLIENT_ID_DEV,
    android: Constants.manifest.extra.android.GOOGLE_CLIENT_ID_DEV
  });
} else {
  FACEBOOK_APP_ID = Platform.select({
    ios: Constants.manifest.extra.ios.FACEBOOK_APP_ID,
    android: Constants.manifest.extra.android.FACEBOOK_APP_ID
  });

  GOOGLE_CLIENT_ID = Platform.select({
    ios: Constants.manifest.extra.ios.GOOGLE_CLIENT_ID,
    android: Constants.manifest.extra.android.GOOGLE_CLIENT_ID
  });
}

export async function fetchUserByFacebookAccessToken(token) {
  const endpoint = "https://graph.facebook.com/me?fields=email";

  // Get the user's email using Facebook's Graph API:
  const resp = await fetch(`${endpoint}&access_token=${token}`);
  const data = await resp.json();

  return data;
}

export async function logInWithGoogle(onSuccess, onError) {
  try {
    const clientId = GOOGLE_CLIENT_ID;
    const { type, user } = await Google.logInAsync({ clientId });

    if (type !== "success") {
      onError("Could not log-in with Google");
    } else {
      onSuccess(user);
    }
  } catch (error) {
    onError(error);
  }
}

export async function logInWithFacebook(onSuccess, onError) {
  try {
    const fid = FACEBOOK_APP_ID;
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(fid);

    if (type !== "success") {
      onError("Could not log-in with Facebook");
    } else {
      const user = await fetchUserByFacebookAccessToken(token);
      onSuccess(user);
    }
  } catch (error) {
    onError(error);
  }
}
