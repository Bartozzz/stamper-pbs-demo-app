import React from "react";
import { connect } from "react-redux";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View
} from "react-native";

import AuthHero from "../../components/auth/Hero";
import Button from "../../components/Button";
import Error from "../../components/Error";
import InputWithIcon from "../../components/InputWithIcon";

import {
  register,
  ACCESS_TOKEN,
  REFRESH_TOKEN
} from "../../store/reducers/auth";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class AuthRegisterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Rejestracja"
  });

  state = {
    // nickname: null,
    // password: null,
    // email: null,
    nickname: "testing",
    password: "Test1234+",
    email: "testing@test.pl",

    error: {
      nickname: [],
      password: [],
      email: [],
      other: []
    }
  };

  registerWithCredentials = () => {
    const { email, password, nickname } = this.state;
    const { register, navigation } = this.props;

    register(email, password, nickname).then(async response => {
      if (!response.error) {
        try {
          const { accessToken, refreshToken } = response.payload.data;

          await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
          await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken);
        } catch (err) {
          console.error(err);
        }

        navigation.navigate(Routes.DASHBOARD);
      } else {
        const { data } = response.error.response;

        const error = {
          nickname: null,
          password: null,
          email: null,
          other: null
        };

        if (data.Nickname) error.nickname = data.Nickname;
        if (data.Password) error.password = data.Password;
        if (data.Email) error.email = data.Email;
        if (data.Error) error.other = data.Error;

        console.debug(error, data);
        this.setState({ error });
      }
    });
  };

  navigateToTOS = () => {
    this.props.navigation.navigate(Routes.AUTH_TOS);
  };

  render() {
    const { nickname, password, email, error } = this.state;

    return (
      <View style={defaultStyles.container}>
        <AuthHero />

        <ScrollView style={styles.regContainer}>
          {error.other ? <Error message={error.other} /> : null}

          <InputWithIcon
            iconName="ios-contact"
            iconSize={20}
            placeholder="Login"
            value={nickname}
            error={error.nickname}
            onChangeText={nickname => this.setState({ nickname })}
            autoCapitalize="none"
          />

          <InputWithIcon
            iconName="ios-at"
            iconSize={20}
            placeholder="Email"
            value={email}
            error={error.email}
            onChangeText={email => this.setState({ email })}
            autoCapitalize="none"
          />

          <InputWithIcon
            iconName="ios-lock"
            iconSize={20}
            placeholder="Password"
            value={password}
            error={error.password}
            onChangeText={password => this.setState({ password })}
            autoCapitalize="none"
            secureTextEntry
          />

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
  loading: state.auth.fetchingData
});

const mapDispatchToProps = {
  // …,
  register
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRegisterScreen);
