import React from "react";
import { TouchableOpacity } from "react-native";

import * as Styled from "./index.styled";
import i18n from "../../translations";

const WelcomeButtons = ({
  login,
  register,
  loginWithFacebook,
  loginWithGoogle,
}) => {
  return (
    <>
      <Styled.Container>
        <Styled.ButtonLoginRegister
          testID="welcome-login"
          title={i18n.t("auth.login")}
          onPress={login}
        />
        <Styled.ButtonLoginRegister
          testID="welcome-register"
          title={i18n.t("auth.register")}
          onPress={register}
        />
      </Styled.Container>

      <Styled.Container>
        <Styled.ButtonFacebook
          testID="login-facebook"
          title={i18n.t("auth.loginwithfacebook")}
          onPress={loginWithFacebook}
        />
      </Styled.Container>

      <TouchableOpacity testID="login-google" onPress={loginWithGoogle}>
        <Styled.ButtonGoogle>
          {i18n.t("auth.loginwithgoogle")}
        </Styled.ButtonGoogle>
      </TouchableOpacity>
    </>
  );
};

export default WelcomeButtons;
