import React from "react";
import { mount } from "enzyme";
import DashboardButton from "./";

import colors from "../../constants/Colors";

import images from "../../constants/images";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("Dashboard Button", () => {
  const exampleText = "Test";

  describe("Render", () => {
    it("Shouldn`t have badge", () => {
      const component = mount(
        <DashboardButton icon={images.MenuImageMap} badge={0}>
          {exampleText}
        </DashboardButton>
      );
      const button = getByTestID(component, "button");
      const badge = getByTestID(component, "badge");
      const icon = getByTestID(component, "icon");
      const text = getByTestID(component, "text");

      expect(button).toBeTruthy();
      expect(badge).not.toBe();
      expect(icon.last().prop("source")).toBe(Icon);
      expect(text.last().text()).toBe("Test");
    });

    it("Should have badge", () => {
      const component = mount(
        <DashboardButton icon={Icon} badge={1}>
          {exampleText}
        </DashboardButton>
      );
      const button = getByTestID(component, "button");
      const badge = getByTestID(component, "badge");
      const icon = getByTestID(component, "icon");
      const text = getByTestID(component, "text");

      expect(button).toBeTruthy();
      expect(badge).toBeTruthy();
      expect(icon.last().prop("source")).toBe(Icon);
      expect(text.last().text()).toBe("Test");
    });
  });

  describe("Interaction", () => {
    it("should change border onPressIn", () => {
      const component = mount(<DashboardButton />);
      const button = getByTestID(component, "button");

      button.first().props().onPressIn();
      component.update();
      expect(
        getByTestID(component, "button").last().prop("style").borderColor
      ).toBe(colors.primary);
    });

    it("should change border onPressOut", () => {
      const component = mount(<DashboardButton />);
      const button = getByTestID(component, "button");

      button.first().props().onPressOut();
      component.update();
      expect(
        getByTestID(component, "button").last().prop("style").borderColor
      ).toBe(colors.border);
    });
  });
});
