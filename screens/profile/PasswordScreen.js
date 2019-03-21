import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";

import Button from "../../components/Button";
import Background from "../../components/Background";
import Error from "../../components/Error";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderTitle from "../../components/nav/HeaderTitle";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import InputWithLabel from "../../components/InputWithLabel";

import { changePassword } from "../../store/reducers/auth";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");

class ProfilePasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.password"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.navigate(Routes.PROFILE_MENU)}
      />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
    currPassword: null,
    newPasswordA: null,
    newPasswordB: null,

    error: {
      currPassword: null,
      newPasswordA: null,
      newPasswordB: null,
      other: null
    }
  };

  editPassword = () => {
    const { currPassword, newPasswordA, newPasswordB } = this.state;
    const { changePassword } = this.props;

    changePassword(currPassword, newPasswordA, newPasswordB)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async () => {
    // Go back:
    this.props.navigation.navigate(Routes.INFO_SUCCESS, {
      redirect: Routes.PROFILE_MENU,
      message: i18n.t("success.changed")
    });
  };

  handleError = async response => {
    const { data } = response.error.response;

    const error = {
      currPassword: null,
      newPasswordA: null,
      newPasswordB: null
    };

    if (data.CurrentPassword) error.currPassword = data.CurrentPassword;
    if (data.NewPassword) error.newPasswordA = data.NewPassword;
    if (data.ConfirmNewPassword) error.newPasswordB = data.ConfirmNewPassword;
    if (data.Error) error.other = data.Error;
    // Returned by API:
    if (data[""]) error.currPassword = data[""];

    this.setState({ error });
  };

  render() {
    const { currPassword, newPasswordA, newPasswordB, error } = this.state;

    return (
      <Background source={BackgroundImage}>
        <View style={styles.form}>
          {error.other ? <Error message={error.other} /> : null}

          <InputWithLabel
            label={i18n.t("profile.password.current")}
            value={currPassword}
            error={error.currPassword}
            onChangeText={currPassword => this.setState({ currPassword })}
            autoCapitalize="none"
            secureTextEntry
          />

          <InputWithLabel
            label={i18n.t("profile.password.password")}
            value={newPasswordA}
            error={error.newPasswordA}
            onChangeText={newPasswordA => this.setState({ newPasswordA })}
            autoCapitalize="none"
            secureTextEntry
          />

          <InputWithLabel
            label={i18n.t("profile.password.confirm")}
            value={newPasswordB}
            error={error.newPasswordB}
            onChangeText={newPasswordB => this.setState({ newPasswordB })}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title={i18n.t("profile.save")} onPress={this.editPassword} />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginHorizontal: 30,

    justifyContent: "center"
  },

  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 30
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  changePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfilePasswordScreen
);
