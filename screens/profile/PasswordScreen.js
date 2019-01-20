import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Hamburger from "../../components/Hamburger";
import InputWithLabel from "../../components/InputWithLabel";

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
    newPasswordB: null
  };

  editPassword = event => {
    console.log("Updating passowrd", this.state);
  };

  render() {
    return (
      <View style={defaultStyles.container}>
        <View style={styles.form}>
          <InputWithLabel
            label="Hasło aktualne"
            value={this.state.currentPassword}
            onChangeText={currPassword => this.setState({ currPassword })}
          />

          <InputWithLabel
            label="Nowe hasło"
            value={this.state.newPasswordA}
            onChangeText={newPasswordA => this.setState({ newPasswordA })}
          />

          <InputWithLabel
            label="Potwierdź hasło"
            value={this.state.newPasswordB}
            onChangeText={newPasswordB => this.setState({ newPasswordB })}
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

export default ProfilePasswordScreen;
