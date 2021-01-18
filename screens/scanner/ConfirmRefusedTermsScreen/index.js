import React from "react";
import { connect } from "react-redux";

import * as Styled from "./index.styled.js";

import * as Box from "../../../components/layout/Box";

import Background from "../../../components/Background";

import * as Routes from "../../../navigation";
import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";

import images from "../../../constants/images";

class ScannerConfirmRefusedTermsScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  accept = () => {
    this.props.navigation.navigate(Routes.DASHBOARD);
  };

  refuse = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Background source={images.BackgroundLogoutWn}>
        <Styled.Logo />

        <Box.Container>
          <Box.Icon width={107} height={85} source={images.Balance} />

          <Box.Heading>{i18n.t("map.terms.refuse.heading")}</Box.Heading>

          <Box.Subheading>
            {i18n.t("map.terms.refuse.subheading")}
          </Box.Subheading>
        </Box.Container>

        <Styled.ButtonsContainer style={defaultStyles.row}>
          <Styled.ButtonStyled title={i18n.t("yes")} onPress={this.accept} />

          <Styled.ButtonStyled title={i18n.t("no")} onPress={this.refuse} />
        </Styled.ButtonsContainer>
      </Background>
    );
  }
}

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannerConfirmRefusedTermsScreen);
