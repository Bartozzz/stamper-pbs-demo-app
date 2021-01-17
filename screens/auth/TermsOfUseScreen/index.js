import React from "react";
import { TouchableOpacity } from "react-native";

import * as Styled from "./index.styled";

import Background from "../../../components/Background";

import * as Box from "../../../components/layout/Box";

import i18n from "../../../translations";
import * as Routes from "../../../navigation";
import Button from "../../../components/Button";

import images from "../../../constants/images";

class TermsOfUseScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    processing: false,
  };

  accept = () => {
    this.setState({ processing: true });

    this.props.navigation.getParam("onAccept")();
  };

  showTerms = () => {
    this.props.navigation.push(Routes.AUTH_TOS);
  };

  render() {
    return (
      <Background source={images.BackgroundHome}>
        <Styled.Logo />

        <Box.Container>
          <Box.Icon width={160} height={125} source={images.Balance} />

          <Box.Heading>{i18n.t("auth.externalTos.headline")}</Box.Heading>

          <TouchableOpacity onPress={this.showTerms}>
            <Box.Action>{i18n.t("auth.externalTos.link")}</Box.Action>
          </TouchableOpacity>
        </Box.Container>

        <Styled.ButtonContainer>
          <Button
            title={i18n.t("yes")}
            onPress={this.accept}
            processing={this.state.processing}
          />
        </Styled.ButtonContainer>
      </Background>
    );
  }
}

export default TermsOfUseScreen;
