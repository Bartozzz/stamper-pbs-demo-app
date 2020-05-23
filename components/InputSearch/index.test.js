import React from "react";
import { mount } from "enzyme";

import InputSearch from "./";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("Input Search", () => {
  const changeTextHandler = jest.fn();

  const component = mount(
    <InputSearch onChangeText={(e) => changeTextHandler(e)} />
  );
  const input = getByTestID(component, "InputSearch");

  it("Render", () => {
    expect(input).toBeTruthy();
  });

  it("Interaction", () => {
    const value = "test";

    component.props().onChangeText(value);
    expect(changeTextHandler).toHaveBeenCalledWith(value);
    expect(changeTextHandler).toHaveBeenCalledTimes(1);
  });
});
