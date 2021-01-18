import React from "react";
import { connect } from "react-redux";
import { TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Styled from "./index.styled.js";

import * as Box from "../../../components/layout/Box";

import Button from "../../../components/Button";
import Background from "../../../components/Background";

import * as Routes from "../../../navigation";
import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";

import images from "../../../constants/images";

class ScannerAcceptStampTermsScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    processing: false,
  };

  openTermsAndConditions = (link) => () => {
    Linking.openURL(link);
  };

  accept = () => {
    this.setState({ processing: true });
    this.props.navigation.getParam("onConfirm", () => {})();
  };

  refuse = () => {
    this.props.navigation.navigate(Routes.SCANNER_CONFIRM_REFUSED_TERMS, {
      onConfirm: () => this.props.navigation.getParam("onConfirm", () => {})(),
    });
  };

  render() {
    const title = this.props.navigation.getParam("title");
    const terms = this.props.navigation.getParam("termsAndConditionsUrl");

    return (
      <Background source={images.BackgroundLogoutWn}>
        <Styled.Logo />

        <Box.Container>
          <Styled.Close onPress={this.refuse}>
            <Ionicons name="md-close" size={32} color="white" />
          </Styled.Close>

          <Box.Icon width={107} height={85} source={images.Balance} />

          <Box.Heading>{i18n.t("map.terms.accept", { title })}</Box.Heading>

          <TouchableOpacity onPress={this.openTermsAndConditions(terms)}>
            <Box.Action>{i18n.t("map.terms.terms")}</Box.Action>
          </TouchableOpacity>
        </Box.Container>

        <Styled.ButtonsContainer style={defaultStyles.row}>
          <Button
            title={i18n.t("map.terms.confirm")}
            onPress={this.accept}
            processing={this.state.processing}
            full
          />
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
)(ScannerAcceptStampTermsScreen);
