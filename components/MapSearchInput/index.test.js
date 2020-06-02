import React from "react";
import { mount } from "enzyme";

import MapSearchInput from "./";

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("MapSearchInput", () => {
  it("should call function if there's onClose prop", () => {
    const onClose = jest.fn();

    const component = mount(<MapSearchInput onClose={onClose} />);
    const inputClose = getByTestID(component, "input-close");

    inputClose.first().props().onPress();
    expect(onClose).toHaveBeenCalled();
  });

  it("should call onChangeTextHandler", () => {
    const changeTextHandler = jest.fn();
    const value = "test";

    const component = mount(
      <MapSearchInput onChangeText={(e) => changeTextHandler(e)} />
    );
    const inputSearch = getByTestID(component, "input-search");

    inputSearch.first().props().onChangeText(value);
    expect(changeTextHandler).toHaveBeenCalledWith(value);
    expect(changeTextHandler).toHaveBeenCalledTimes(1);
  });
});
