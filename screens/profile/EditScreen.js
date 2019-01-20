import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Hamburger from "../../components/Hamburger";
import InputWithLabel from "../../components/InputWithLabel";

import * as Routes from "../../navigation";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ProfileEditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Edycja profilu",
    headerRight: <Hamburger navigation={navigation} />
  });

  editProfile = event => {
    console.log("Updating profile");
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <InputWithLabel label="Imię" />
          </View>

          <View style={styles.inputContainer}>
            <InputWithLabel label="Nazwisko" />
          </View>

          <View style={styles.inputContainer}>
            <InputWithLabel label="Email" />
          </View>

          <View style={styles.inputContainer}>
            <InputWithLabel label="Nick" />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Zapisz zmiany" onPress={this.editProfile} />
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
    marginHorizontal: 30
  },

  inputContainer: {
    marginVertical: 10
  },
  buttonContainer: {
    marginBottom: 70,
    marginHorizontal: 30
  }
});

export default ProfileEditScreen;
