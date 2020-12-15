import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as Box from "../../components/layout/Box";

import Button from "../../components/Button";
import Background from "../../components/Background";
import { StamperLogo } from "../../components/Stamper";

import * as Routes from "../../navigation";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";

import images from "../../constants/images";

class MapAcceptCardTermsScreen extends React.Component {
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
    this.props.navigation.navigate(Routes.MAP_CONFIRM_REFUSED_TERMS, {
      onConfirm: () => this.props.navigation.getParam("onConfirm", () => {})(),
    });
  };

  render() {
    const title = this.props.navigation.getParam("title");
    const terms = this.props.navigation.getParam("termsAndConditionsUrl");

    return (
      <Background source={images.BackgroundLogoutWn}>
        <StamperLogo style={styles.logo} />

        <Box.Container>
          <TouchableOpacity style={styles.close} onPress={this.refuse}>
            <Ionicons name="md-close" size={32} color="white" />
          </TouchableOpacity>

          <Box.Icon width={107} height={85} source={images.Balance} />

          <Box.Heading>{i18n.t("map.terms.accept", { title })}</Box.Heading>

          <TouchableOpacity onPress={this.openTermsAndConditions(terms)}>
            <Box.Action>{i18n.t("map.terms.terms")}</Box.Action>
          </TouchableOpacity>
        </Box.Container>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button
            title={i18n.t("map.terms.confirm")}
            onPress={this.accept}
            processing={this.state.processing}
            full
          />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",

    marginTop: 80,
    marginBottom: 30,
  },

  close: {
    position: "absolute",
    top: 10,
    right: 15,
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50,
    marginHorizontal: 20,
  },
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapAcceptCardTermsScreen);
