export function getParameterByName(name, url) {
  const param = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + param + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);

  if (!results) {
    return null;
  } else if (!results[2]) {
    return "";
  } else {
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
}
