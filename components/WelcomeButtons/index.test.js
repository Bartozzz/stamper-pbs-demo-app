import React from "react";
import { Platform } from "react-native";
import { mount } from "enzyme";
import WelcomeButtons from "./";

const onPress = jest.fn();

const getByTestID = (component, ID) => {
  return component.findWhere((node) => node.prop("testID") === `${ID}`);
};

describe("WelcomeButtons", () => {
  it("Clicking should perform an action", () => {
    const component = mount(
      <WelcomeButtons
        login={onPress}
        register={onPress}
        loginWithFacebook={onPress}
        loginWithGoogle={onPress}
        loginWithApple={onPress}
      />
    );
    const login = getByTestID(component, "welcome-login");
    const register = getByTestID(component, "welcome-register");
    const apple = getByTestID(component, "login-apple");
    const facebook = getByTestID(component, "login-facebook");
    const google = getByTestID(component, "login-google");

    login.first().props().onPress();
    register.first().props().onPress();
    Platform.OS === "ios" && apple.first().props().onPress();
    facebook.first().props().onPress();
    google.first().props().onPress();

    expect(onPress).toHaveBeenCalledTimes(Platform.OS === "ios" ? 5 : 4);
  });
});
