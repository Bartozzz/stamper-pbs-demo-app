import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import colors from "../constants/Colors";

import i18n from "../translations";

import Button from "./Button";

const Container = styled(View)`
  flex-direction: row;
  justify-content: center;
`;

const ButtonLoginRegister = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
  width: 130px;
`;

const ButtonFacebook = styled(Button)`
  margin-top: 20px;
  width: 270px;
`;

const ButtonGoogle = styled(Text)`
  color: ${colors.color};
  text-align: center;
  padding: 10%;
`;

const WelcomeButtons = ({ login, register, loginWithFacebook, loginWithGoogle  }) => {
    return (
        <>
            <Container>
                <ButtonLoginRegister title={i18n.t("auth.login")} onPress={login} />
                <ButtonLoginRegister title={i18n.t("auth.register")} onPress={register} />
            </Container>

            <Container>
                <ButtonFacebook title={i18n.t("auth.loginwithfacebook")} onPress={loginWithFacebook} />
            </Container>

            <TouchableOpacity onPress={loginWithGoogle} >
                <ButtonGoogle>{i18n.t("auth.loginwithgoogle")}</ButtonGoogle>
            </TouchableOpacity>
        </>
    )
}

export default WelcomeButtons;
