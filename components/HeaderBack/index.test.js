import React from "react";
import { mount } from "enzyme";

import HeaderBack from "./";

describe("HeaderBack", () => {
  it("should callfunction if there's onPress prop", () => {
    const onPress = jest.fn();

    const component = mount(<HeaderBack onPress={onPress} />);

    component.props().onPress();
    expect(onPress).toHaveBeenCalled();
  });
});
