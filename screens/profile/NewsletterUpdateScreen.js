import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Background from "../../components/Background";

import { updateNewsletter } from "../../store/reducers/profile";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const LogoImage = require("../../assets/logos/stamper_logo_2x.png");
const LogoImageEn = require("../../assets/logos/stamper_logo_300px_en.png");
const NewsletterIcon = require("../../assets/images/icons/newsletter.png");

class NewsletterUpdateScreen extends React.Component {
  static navigationOptions = () => ({
    header: null
  });

  navigateToTOS = () => {
    this.props.navigation.navigate(Routes.PROFILE_NEWSLETTER_TOS);
  };

  accept = async () => {
    const { navigation, updateNewsletter } = this.props;

    updateNewsletter(true).finally(() => {
      navigation.navigate(Routes.AUTH_LOADING);
    });
  };

  refuse = () => {
    const { navigation, updateNewsletter } = this.props;

    updateNewsletter(false).finally(() => {
      navigation.navigate(Routes.AUTH_LOADING);
    });
  };

  renderLogo() {
    const currentLocale = i18n.currentLocale();

    if (!currentLocale || currentLocale.includes("en")) {
      return (
        <Image
          source={LogoImageEn}
          style={[styles.logo, { width: 195, height: 70 }]}
        />
      );
    } else {
      return (
        <Image
          source={LogoImage}
          style={[styles.logo, { width: 195, height: 70 }]}
        />
      );
    }
  }

  render() {
    return (
      <Background source={BackgroundImage}>
        {this.renderLogo()}

        <View style={[defaultStyles.center, styles.box]}>
          <Image style={styles.boxIcon} source={NewsletterIcon} />

          <Text style={styles.boxText}>
            {i18n.t("profile.newsletter.headline")}
          </Text>

          <View style={[defaultStyles.row, styles.boxAction]}>
            <Text style={styles.boxActionText}>
              {i18n.t("profile.newsletter.action")}
            </Text>

            <TouchableOpacity onPress={this.navigateToTOS}>
              <Text style={[styles.boxActionText, { fontWeight: "900" }]}>
                {" "}
                {i18n.t("profile.newsletter.title")}
              </Text>
            </TouchableOpacity>

            <Text style={styles.boxActionText}>?</Text>
          </View>
        </View>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button
            style={styles.button}
            title={i18n.t("yes")}
            onPress={this.accept}
          />

          <Button
            style={styles.button}
            title={i18n.t("no")}
            onPress={this.refuse}
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
    marginBottom: 30
  },

  box: {
    alignItems: "center",

    paddingTop: 60,
    paddingBottom: 60,
    marginVertical: 20,
    marginHorizontal: 36,
    marginTop: 20,

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
  boxAction: {
    marginTop: 30
  },
  boxActionText: {
    color: "#709BE7",
    fontSize: 18,
    textAlign: "center"
  },
  boxIcon: {
    width: 160,
    height: 126,
    marginBottom: 60
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50
  },
  button: {
    width: 90
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  updateNewsletter
};

export default connect(mapStateToProps, mapDispatchToProps)(
  NewsletterUpdateScreen
);
