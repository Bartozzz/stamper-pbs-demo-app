import getFont, { defaultFont, weightMap } from "./getFont";

describe("getFont helper", () => {
  it("should return default font name if there's no parameters passed", () => {
    expect(getFont()).toEqual(
      `${defaultFont.name}_${weightMap[defaultFont.weight]}`
    );
  });

  it(`should return "test-bold-italic" font as parameters are passed`, () => {
    const testFont = {
      name: "test",
      weight: "bold",
    };

    expect(getFont(testFont.name, testFont.weight, true)).toEqual(
      `${testFont.name}_${weightMap[testFont.weight]}_Italic`
    );
  });
});
