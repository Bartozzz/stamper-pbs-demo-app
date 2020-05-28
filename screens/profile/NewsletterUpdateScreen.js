import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Background from "../../components/Background";
import { StamperLogo } from "../../components/Stamper";

import { updateNewsletter } from "../../store/reducers/profile";

import * as Box from "../../components/layout/Box";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const NewsletterIcon = require("../../assets/images/icons/newsletter.png");

class NewsletterUpdateScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    processing: false,
  };

  navigateToTOS = () => {
    this.props.navigation.navigate(Routes.PROFILE_NEWSLETTER_TOS);
  };

  accept = () => {
    this.setState({ processing: true });

    this.props.updateNewsletter(true).finally(() => {
      this.props.navigation.navigate(Routes.AUTH_LOADING);
    });
  };

  refuse = () => {
    this.setState({ processing: true });

    this.props.updateNewsletter(false).finally(() => {
      this.props.navigation.navigate(Routes.AUTH_LOADING);
    });
  };

  render() {
    return (
      <Background source={BackgroundImage}>
        <StamperLogo style={styles.logo} />

        <Box.Container>
          <Box.Icon width={107} height={85} source={NewsletterIcon} />

          <Box.Heading>{i18n.t("profile.newsletter.headline")}</Box.Heading>

          <TouchableOpacity onPress={this.navigateToTOS}>
            <Box.Action>{i18n.t("profile.newsletter.terms")}</Box.Action>
          </TouchableOpacity>

          <Box.Subheading>
            {i18n.t("profile.newsletter.question")}
          </Box.Subheading>
        </Box.Container>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button
            style={styles.button}
            title={i18n.t("yes")}
            onPress={this.accept}
            processing={this.state.processing}
          />

          <Button
            style={styles.button}
            title={i18n.t("no")}
            onPress={this.refuse}
            processing={this.state.processing}
          />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",

    marginTop: 40,
    marginBottom: 0,
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50,
  },
  button: {
    width: 90,
  },
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  updateNewsletter,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsletterUpdateScreen);
