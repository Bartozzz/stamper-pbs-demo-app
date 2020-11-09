import React from "react";
import { mount } from "enzyme";

import Checkbox from "./";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("Checkbox", () => {
  const onChange = jest.fn();

  const component = mount(<Checkbox onChange={(state) => onChange(state)} />);
  const checkbox = getByTestID(component, "checkbox");

  it("Render", () => {
    expect(checkbox).toBeTruthy();
  });

  it("Interaction", () => {
    checkbox.first().props().onPress();
    component.update();
    expect(getByTestID(component, "checked-icon")).toBeTruthy();
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
