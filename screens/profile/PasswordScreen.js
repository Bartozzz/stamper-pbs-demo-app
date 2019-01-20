import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Hamburger from "../../components/Hamburger";
import InputWithLabel from "../../components/InputWithLabel";

import * as Routes from "../../navigation";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ProfilePasswordScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Zmiana hasła",
    headerRight: <Hamburger navigation={navigation} />
  });

  editPassword = event => {
    console.log("Updating passowrd");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <InputWithLabel label="Hasło aktualne" />
          </View>

          <View style={styles.inputContainer}>
            <InputWithLabel label="Nowe hasło" />
          </View>

          <View style={styles.inputContainer}>
            <InputWithLabel label="Potwierdź hasło" />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Zapisz zmiany" onPress={this.editPassword} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  form: {
    flex: 1,
    marginHorizontal: 30,

    justifyContent: "center"
  },

  inputContainer: {
    marginVertical: 10
  },
  buttonContainer: {
    marginBottom: 70,
    marginHorizontal: 30
  }
});

export default ProfilePasswordScreen;
