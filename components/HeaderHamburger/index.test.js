import React from "react";
import { mount } from "enzyme";

import HeaderHamburger from "./";

describe("HeaderHamburger", () => {
  it("should callfunction if there's onPress prop", () => {
    const onPress = jest.fn();

    const component = mount(<HeaderHamburger onPress={onPress} />);

    component.props().onPress();
    expect(onPress).toHaveBeenCalled();
  });
});
