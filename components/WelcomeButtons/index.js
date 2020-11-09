import React from "react";
import { Platform } from "react-native";

import * as Styled from "./index.styled";
import i18n from "../../translations";

import Google from "../../assets/images/icons/google.png";
import Apple from "../../assets/images/icons/apple.png";
import Facebook from "../../assets/images/icons/facebook.png";

const WelcomeButtons = ({
  login,
  register,
  loginWithApple,
  loginWithFacebook,
  loginWithGoogle,
}) => {
  return (
    <>
      <Styled.Container>
        <Styled.LoginRegisterButton
          testID="welcome-login"
          title={i18n.t("auth.login")}
          onPress={login}
        />
        <Styled.LoginRegisterButton
          testID="welcome-register"
          title={i18n.t("auth.register")}
          onPress={register}
        />
      </Styled.Container>

      <Styled.OrLoginWith>{i18n.t("auth.orLogInWith")}</Styled.OrLoginWith>

      <Styled.ExternalLoginContainer>
        {Platform.OS === "ios" && (
          <Styled.LogInWith onPress={loginWithApple} testID="login-apple">
            <Styled.Icon source={Apple} />
          </Styled.LogInWith>
        )}
        <Styled.LogInWith onPress={loginWithFacebook} testID="login-facebook">
          <Styled.Icon source={Facebook} />
        </Styled.LogInWith>
        <Styled.LogInWith onPress={loginWithGoogle} testID="login-google">
          <Styled.Icon source={Google} />
        </Styled.LogInWith>
      </Styled.ExternalLoginContainer>
    </>
  );
};

export default WelcomeButtons;
