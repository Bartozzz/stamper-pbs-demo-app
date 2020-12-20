import { isFeatureEnabled, isFeatureDisabled } from "./features";

describe("Features helpers", () => {
  describe("isFeatureEnabled", () => {
    it('should return true if feature flag is set to "true"', () => {
      expect(isFeatureEnabled(true)).toBeTruthy();
    });

    it('should return false if feature flag is not set to "true"', () => {
      expect(isFeatureEnabled(false)).toBeFalsy();
      expect(isFeatureEnabled(null)).toBeFalsy();
      expect(isFeatureEnabled(undefined)).toBeFalsy();
      expect(isFeatureEnabled("")).toBeFalsy();
    });
  });

  describe("isFeatureDisabled", () => {
    it('should return true if feature flag is not set to "true"', () => {
      expect(isFeatureDisabled(false)).toBeTruthy();
      expect(isFeatureDisabled(null)).toBeTruthy();
      expect(isFeatureDisabled(undefined)).toBeTruthy();
      expect(isFeatureDisabled("")).toBeTruthy();
    });

    it('should return false if feature flag is set to "true"', () => {
      expect(isFeatureDisabled(true)).toBeFalsy();
    });
  });
});
