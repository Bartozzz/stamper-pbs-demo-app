import React from "react";
import { mount } from "enzyme";

import MapCardToggler from "./";
import i18n from "../../translations";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("MapCardToggler", () => {
  it("should call function if there's onPress prop", () => {
    const onPress = jest.fn();

    const component = mount(<MapCardToggler onPress={onPress} />);

    component.props().onPress();
    expect(onPress).toHaveBeenCalled();
  });

  it("should show map.closeCards text", () => {
    const component = mount(<MapCardToggler show={true} />);
    const togglerText = getByTestID(component, "toggler-text");

    expect(togglerText.last().text()).toBe(i18n.t("map.closeCards"));
  });

  it("should show map.showCards text", () => {
    const component = mount(<MapCardToggler show={false} />);
    const togglerText = getByTestID(component, "toggler-text");

    expect(togglerText.last().text()).toBe(i18n.t("map.showCards"));
  });
});
