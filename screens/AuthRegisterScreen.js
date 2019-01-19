import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";

import AuthHero from "../components/auth/Hero";
import Button from "../components/Button";
import Input from "../components/Input";

import colors from "../constants/Colors";
import layout from "../constants/Layout";

class AuthRegisterScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    login: null,
    email: null,
    password: null
  };

  registerWithCredentials = () => {
    console.log("Logging-in with credentials", this.state);
  };

  navigateToTOS = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    return (
      <View style={styles.container}>
        <AuthHero />

        <ScrollView style={styles.regContainer}>
          <View style={styles.inputContainer}>
            <Input
              placeholder="Login"
              value={this.state.login}
              onChangeText={login => this.setState({ login })}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Input
              placeholder="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>

          <AuthRegisterScreenLinks navigateToTOS={this.navigateToTOS} />

          <Button
            title="Zarejestruj się"
            onPress={this.registerWithCredentials}
          />
        </ScrollView>
      </View>
    );
  }
}

export const AuthRegisterScreenLinks = props => (
  <View style={styles.regContainerTextContainer}>
    <Text style={[styles.regContainerText, styles.regContainerTextA]}>
      Kontynuując akceptujesz Nasz
    </Text>

    <TouchableOpacity onPress={props.navigateToTOS}>
      <Text style={[styles.regContainerText, styles.regBold]}>
        Regulamin{"  "}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  inputContainer: {
    alignItems: "center",
    marginVertical: 15
  },

  regBold: {
    fontWeight: "900"
  },
  regContainer: {
    marginHorizontal: 30
  },
  regContainerTextContainer: {
    marginTop: 10,
    marginBottom: 25,

    flexDirection: "row",
    alignSelf: "center"
  },
  regContainerText: {
    fontSize: 16,

    color: colors.color,
    textAlign: "center"
  }
});

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegisterScreen);
