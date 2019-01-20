import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import Button from "../../components/Button";
import Hamburger from "../../components/Hamburger";
import InputWithLabel from "../../components/InputWithLabel";

import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ProfileEditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Edycja profilu",
    headerRight: <Hamburger navigation={navigation} />
  });

  state = {
    firstName: null,
    lastName: null,
    email: null,
    login: null
  };

  editProfile = event => {
    console.log("Updating profile", this.state);
  };

  render() {
    return (
      <View style={defaultStyles.container}>
        <View style={styles.form}>
          <InputWithLabel
            label="Imię"
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />

          <InputWithLabel
            label="Nazwisko"
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />

          <InputWithLabel
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

          <InputWithLabel
            label="Nick"
            value={this.state.login}
            onChangeText={login => this.setState({ login })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Zapisz zmiany" onPress={this.editProfile} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    marginHorizontal: 30
  },

  buttonContainer: {
    marginBottom: 70,
    marginHorizontal: 30
  }
});

export default ProfileEditScreen;
