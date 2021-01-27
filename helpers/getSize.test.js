import { getSize } from "./getSize";

describe("getSize helper", () => {
  describe("getSize", () => {
    it("should return width and height if defined", () => {
      expect(getSize(1, 2, 3)).toEqual([1, 2]);
    });

    it("should return size if width and height not defined", () => {
      expect(getSize(null, null, 3)).toEqual([3, 3]);
    });
  });
});
