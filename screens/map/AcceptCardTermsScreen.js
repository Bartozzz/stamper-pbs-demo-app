import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Linking
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Button from "../../components/Button";
import Background from "../../components/Background";
import Logo from "../../components/Logo";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const BalanceIcon = require("../../assets/images/icons/balance.png");

class MapAcceptCardTermsScreen extends React.Component {
  static navigationOptions = () => ({
    header: null
  });

  openTermsAndConditions = link => () => {
    Linking.openURL(link);
  };

  accept = () => {
    this.props.navigation.getParam("onConfirm", () => {})();
  };

  refuse = () => {
    this.props.navigation.goBack();
  };

  render() {
    const title = this.props.navigation.getParam("title");
    const terms = this.props.navigation.getParam("termsAndConditionsUrl");

    return (
      <Background source={BackgroundImage}>
        <Logo style={styles.logo} />

        <View style={[defaultStyles.center, styles.box]}>
          <TouchableOpacity style={styles.close} onPress={this.refuse}>
            <Ionicons name="md-close" size={32} color="white" />
          </TouchableOpacity>

          <Image style={styles.boxIcon} source={BalanceIcon} />

          <Text style={styles.boxText}>
            {i18n.t("map.terms.accept", { title })}
          </Text>

          <View style={[defaultStyles.row, styles.boxAction]}>
            <TouchableOpacity onPress={this.openTermsAndConditions(terms)}>
              <Text
                style={[styles.boxActionText, { textTransform: "uppercase" }]}
              >
                {i18n.t("map.terms.terms")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button title={i18n.t("map.terms.confirm")} onPress={this.accept} />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",

    marginTop: 45,
    marginBottom: 10
  },

  close: {
    position: "absolute",
    top: 10,
    right: 15
  },

  box: {
    position: "relative",
    alignItems: "center",

    paddingTop: 40,
    paddingBottom: 40,
    marginVertical: 20,
    marginHorizontal: 20,

    shadowColor: "#2699FB",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.1,
    shadowRadius: 30,

    borderRadius: 10,
    backgroundColor: colors.background
  },
  boxText: {
    paddingHorizontal: 30,

    color: colors.color,
    fontSize: 24,
    textAlign: "center"
  },
  boxAlternativeText: {
    textAlign: "center",
    fontSize: 18,
    color: colors.color
  },
  boxAction: {
    marginTop: 20
  },
  boxActionText: {
    color: "#709BE7",
    fontSize: 18,
    textAlign: "center"
  },
  boxIcon: {
    width: 107,
    height: 85,
    marginBottom: 40
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50,
    marginHorizontal: 20
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(
  MapAcceptCardTermsScreen
);
