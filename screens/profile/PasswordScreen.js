import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Error from "../../components/Error";
import Hamburger from "../../components/Hamburger";
import InputWithLabel from "../../components/InputWithLabel";

import { changePassword } from "../../store/reducers/auth";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ProfilePasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Zmiana hasła",
    headerRight: <Hamburger navigation={navigation} />
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

  editPassword = event => {
    const { currPassword, newPasswordA, newPasswordB } = this.state;
    const { changePassword } = this.props;

    changePassword(currPassword, newPasswordA, newPasswordB)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async response => {
    // Go back:
    this.props.navigation.navigate(Routes.PROFILE_MENU);
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
      <View style={defaultStyles.container}>
        <View style={styles.form}>
          {error.other ? <Error message={error.other} /> : null}

          <InputWithLabel
            label="Hasło aktualne"
            value={currPassword}
            error={error.currPassword}
            onChangeText={currPassword => this.setState({ currPassword })}
            autoCapitalize="none"
            secureTextEntry
          />

          <InputWithLabel
            label="Nowe hasło"
            value={newPasswordA}
            error={error.newPasswordA}
            onChangeText={newPasswordA => this.setState({ newPasswordA })}
            autoCapitalize="none"
            secureTextEntry
          />

          <InputWithLabel
            label="Potwierdź hasło"
            value={newPasswordB}
            error={error.newPasswordB}
            onChangeText={newPasswordB => this.setState({ newPasswordB })}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Zapisz zmiany" onPress={this.editPassword} />
        </View>
      </View>
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
    marginBottom: 70,
    marginHorizontal: 30
  }
});

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
  changePassword
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ProfilePasswordScreen
);
