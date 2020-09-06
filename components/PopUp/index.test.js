import React from "react";
import { mount } from "enzyme";
import PopUp from "./";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("/components/PopUp", () => {
  it("shouldn't be disabled if active equals false", () => {
    const component = mount(<PopUp active={false} />);

    expect(
      getByTestID(component, "pop-up").last().prop("style")[0].display
    ).toBe("none");
  });

  it("should call function if there's onClose prop", () => {
    const onClose = jest.fn();

    const component = mount(<PopUp onClose={() => onClose()} />);
    const popUpClose = getByTestID(component, "pop-up-close");

    popUpClose.first().props().onPress();
    expect(onClose).toHaveBeenCalled();
  });

  it("should call function if there's onPress prop", () => {
    const onPress = jest.fn();

    const component = mount(<PopUp onPress={() => onPress()} />);
    const popUpButton = getByTestID(component, "pop-up-button");

    popUpButton.first().props().onPress();
    component.update();
    expect(onPress).toHaveBeenCalled();
  });
});
