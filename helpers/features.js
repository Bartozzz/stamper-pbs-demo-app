export function isFeatureEnabled(feature) {
  return feature === true;
}

export function isFeatureDisabled(feature) {
  return !isFeatureEnabled(feature);
}
