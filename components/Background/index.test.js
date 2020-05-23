import React from "react";
import { mount } from "enzyme";

import Background from "./";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("Background", () => {
  it("should render view if scroll is disable", () => {
    const component = mount(<Background disableScroll />);
    const view = getByTestID(component, "background-view");
    const scrollview = getByTestID(component, "background-scrollview");

    expect(view).toBeTruthy();
    expect(scrollview).not.toBe();
  });

  it("should render scrollview if there`s no `scrolldisabled`", () => {
    const component = mount(<Background />);
    const view = getByTestID(component, "background-view");
    const scrollview = getByTestID(component, "background-scrollview");

    expect(view).not.toBe();
    expect(scrollview).toBeTruthy();
  });
});
