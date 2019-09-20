import { Google } from "expo";
import * as Facebook from "expo-facebook";
import getEnvVariables from "./env";

const { facebookAppId, googleClientId } = getEnvVariables();

export async function fetchUserByFacebookAccessToken(token) {
  const endpoint = "https://graph.facebook.com/me?fields=email";

  // Get the user's email using Facebook's Graph API:
  const resp = await fetch(`${endpoint}&access_token=${token}`);
  const data = await resp.json();

  return data;
}

export async function logInWithGoogle(onSuccess, onError) {
  try {
    const clientId = googleClientId;
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
    const fid = facebookAppId;
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
