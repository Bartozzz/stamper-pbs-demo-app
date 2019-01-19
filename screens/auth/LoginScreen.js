import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";

import AuthHero from "../../components/auth/Hero";
import Button from "../../components/Button";
import InputWithIcon from "../../components/InputWithIcon";

import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class AuthLoginScreen extends React.Component {
  static navigationOptions = {
    title: "Logowanie",
    header: null
  };

  state = {
    email: null,
    password: null
  };

  loginWithFacebook = () => {
    console.log("Logging-in with Facebook");
  };

  loginWithGoogle = () => {
    console.log("Logging-in with Google");
  };

  loginWithCredentials = () => {
    console.log("Logging-in with credentials", this.state);

    this.props.navigation.navigate("Url");
  };

  navigateToRegister = () => {
    this.props.navigation.navigate("Register");
  };

  render() {
    return (
      <View style={styles.container}>
        <AuthHero style={styles.hero} />

        <ScrollView style={styles.loginContainer}>
          <View style={styles.inputContainer}>
            <InputWithIcon
              iconName="ios-contact"
              iconSize={20}
              placeholder="Email"
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <InputWithIcon
              iconName="ios-lock"
              iconSize={20}
              placeholder="Password"
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>

          <AuthLoginScreenLinks
            loginWithFacebook={this.loginWithFacebook}
            loginWithGoogle={this.loginWithGoogle}
            navigateToRegister={this.navigateToRegister}
          />

          <Button title="Zaloguj się" onPress={this.loginWithCredentials} />
        </ScrollView>
      </View>
    );
  }
}

export const AuthLoginScreenLinks = props => (
  <View>
    <View style={styles.loginContainerTextContainer}>
      <Text style={[styles.loginContainerText, styles.loginContainerTextA]}>
        Zaloguj się z
      </Text>

      <TouchableOpacity onPress={props.loginWithFacebook}>
        <Text
          style={[
            styles.loginContainerText,
            styles.loginContainerTextA,
            styles.loginProvider
          ]}
        >
          {" "}
          Facebook{"  "}
        </Text>
      </TouchableOpacity>

      <Text style={[styles.loginContainerText, styles.loginContainerTextA]}>
        lub
      </Text>

      <TouchableOpacity onPress={props.loginWithGoogle}>
        <Text
          style={[
            styles.loginContainerText,
            styles.loginContainerTextA,
            styles.loginProvider
          ]}
        >
          {" "}
          Google.
        </Text>
      </TouchableOpacity>
    </View>

    <TouchableOpacity onPress={props.navigateToRegister}>
      <Text style={[styles.loginContainerText, styles.loginContainerTextB]}>
        Rejestracja
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  hero: {
    paddingTop: 70,
    height: 460
  },

  inputContainer: {
    alignItems: "center",
    marginVertical: 15
  },

  loginProvider: {
    fontWeight: "900"
  },
  loginContainer: {
    marginHorizontal: 30
  },
  loginContainerTextContainer: {
    flexDirection: "row",
    alignSelf: "center"
  },
  loginContainerText: {
    color: colors.color,
    textAlign: "center"
  },
  loginContainerTextA: {
    fontSize: 16,

    marginTop: 15,
    marginBottom: 10
  },
  loginContainerTextB: {
    fontSize: 20,
    fontWeight: "900",

    marginTop: 15,
    marginBottom: 30
  }
});

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoginScreen);
