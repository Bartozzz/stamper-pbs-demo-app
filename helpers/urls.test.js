import { getParameterByName } from "./urls";

describe("URLs helpers", () => {
  describe("getParameterByName", () => {
    const url = "https://google.com:80/?foo=lorem&bar=&baz#123";

    it("should return proper value from query string", () => {
      expect(getParameterByName("foo", url)).toEqual("lorem");
      expect(getParameterByName("bar", url)).toEqual("");
      expect(getParameterByName("baz", url)).toEqual("");
      expect(getParameterByName("qux", url)).toEqual(null);
    });
  });
});
