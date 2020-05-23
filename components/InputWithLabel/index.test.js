import React from "react";
import { mount } from "enzyme";

import InputWithLabel from "./";
import colors from "../../constants/Colors";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("Input Search", () => {
  const errorMessage = "test";
  const text = "test";

  const onChangeText = jest.fn();

  it("Render", () => {
    const component = mount(
      <InputWithLabel onChangeText={(e) => onChangeText(e)} />
    );
    const input = getByTestID(component, "input-label");

    expect(input).toBeTruthy();
  });

  describe("Interaction", () => {
    it("should call changeTextHandler on changing text", () => {
      const component = mount(
        <InputWithLabel onChangeText={(e) => onChangeText(e)} />
      );

      component.props().onChangeText(text);
      expect(onChangeText).toHaveBeenCalledWith(text);
      expect(onChangeText).toHaveBeenCalledTimes(1);
    });

    it("should have valid color if focused", () => {
      const component = mount(
        <InputWithLabel onChangeText={(e) => onChangeText(e)} />
      );
      const input = getByTestID(component, "input-label-parent");

      input.last().props().onFocus();
      component.update();
      expect(
        getByTestID(component, "input-label-parent").last().prop("isFocused")
      ).toBe(true);
      expect(
        getByTestID(component, "input-label-parent")
          .last()
          .prop("placeholderTextColor")
      ).toBe(colors.color);
    });

    it("should have valid color if blurred", () => {
      const component = mount(
        <InputWithLabel onChangeText={(e) => onChangeText(e)} />
      );
      const input = getByTestID(component, "input-label-parent");

      input.last().props().onBlur();
      component.update();
      expect(
        getByTestID(component, "input-label-parent").last().prop("isFocused")
      ).toBe(false);
      expect(
        getByTestID(component, "input-label-parent")
          .last()
          .prop("placeholderTextColor")
      ).toBe(colors.inputBorder);
    });

    it("should show error message and have valid color if has an error", () => {
      const component = mount(<InputWithLabel error={errorMessage} />);
      const error = getByTestID(component, "input-label-error");

      expect(error.last().text()).toEqual("test.");
      expect(error.last().prop("style")[0].color).toBe(colors.error);
    });
  });
});
