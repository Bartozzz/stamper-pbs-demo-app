import React from "react";
import { mount } from "enzyme";
import CardBackground from "./";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("Card Background", () => {
  it("Should render image if there's src", () => {
    const component = mount(
      <CardBackground src="https://placekitten.com/200/300" />
    );
    const image = getByTestID(component, "card-background");

    expect(image).toBeTruthy();
  });
});
