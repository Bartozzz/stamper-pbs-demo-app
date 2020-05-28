import React from "react";
import { mount } from "enzyme";
import Error from ".";
import i18n from "../../translations";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("Error", () => {
  const error = "test";
  const errorArray = ["test", "test2"];

  it("Shouldn't show any errors", () => {
    const component = mount(<Error message={null} />);
    const errorMessage = getByTestID(component, "error-message");

    expect(errorMessage.last().text()).toBe(i18n.t("errorInternal"));
  });

  it("Should show an error", () => {
    const component = mount(<Error message={error} />);
    const errorMessage = getByTestID(component, "error-message");

    expect(errorMessage.last().text()).toBe("test.");
  });

  it("Should show an error (message is an array)", () => {
    const component = mount(<Error message={errorArray} />);
    const errorMessage = getByTestID(component, "error-message");

    expect(errorMessage.last().text()).toBe("test. test2.");
  });
});
