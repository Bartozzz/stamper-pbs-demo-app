import { decode } from "base-64";
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";
import * as AppleAuthentication from "expo-apple-authentication";

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
    await Facebook.initializeAsync(fid);
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

export async function logInWithApple(onSuccess, onError) {
  try {
    const user = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });
    onSuccess(user);
  } catch (error) {
    onError(error);
  }
}

export function parseJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    decode(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );

  return JSON.parse(jsonPayload);
}
