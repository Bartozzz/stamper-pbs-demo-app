import React from "react";
import { connect } from "react-redux";
import { StyleSheet, AsyncStorage, Image, Text, View } from "react-native";

import Button from "../../components/Button";
import Error from "../../components/Error";
import Hamburger from "../../components/Hamburger";
import InputWithLabel from "../../components/InputWithLabel";

import {
  EMAIL,
  updateProfile,
  setNickname,
  setFirstname,
  setLastname,
  setEmail,
  setPhoto
} from "../../store/reducers/profile";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ProfileEditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.edit"),
    headerRight: <Hamburger navigation={navigation} />
  });

  state = {
    firstName: this.props.firstname,
    lastName: this.props.lastname,
    login: this.props.nickname,
    email: this.props.email,
    photo: this.props.photo,

    error: {
      firstName: null,
      lastName: null,
      login: null,
      email: null,
      photo: null,
      other: null
    }
  };

  editProfile = event => {
    const { login, firstName, lastName, email } = this.state;
    const { updateProfile } = this.props;

    updateProfile(login, firstName, lastName, email)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  handleSuccess = async response => {
    await AsyncStorage.setItem(EMAIL, this.state.email);

    // Update local store (here because update endpoint doesn't return updated
    // data):
    this.props.setNickname(this.state.login);
    this.props.setFirstname(this.state.firstName);
    this.props.setLastname(this.state.lastName);
    this.props.setEmail(this.state.email);
    this.props.setPhoto(this.state.photo);

    // Go back:
    this.props.navigation.navigate(Routes.PROFILE_MENU);
  };

  handleError = async response => {
    const { data } = response.error.response;

    const error = {
      firstName: null,
      lastName: null,
      login: null,
      email: null,
      photo: null,
      other: null
    };

    if (data.Nickname) error.login = data.Nickname;
    if (data.Firstname) error.firstName = data.Firstname;
    if (data.Lastname) error.lastName = data.Lastname;
    if (data.Email) error.email = data.Email;
    if (data.Photo) error.other = data.Photo;
    if (data.Error) error.other = data.Error;

    this.setState({ error });
  };

  render() {
    const { firstName, lastName, email, login, photo, error } = this.state;

    return (
      <View style={defaultStyles.container}>
        <View style={styles.form}>
          {error.other ? <Error message={error.other} /> : null}

          <InputWithLabel
            label={i18n.t("auth.firstname")}
            value={firstName}
            error={error.firstName}
            onChangeText={firstName => this.setState({ firstName })}
          />

          <InputWithLabel
            label={i18n.t("auth.lastname")}
            value={lastName}
            error={error.lastName}
            onChangeText={lastName => this.setState({ lastName })}
          />

          <InputWithLabel
            label={i18n.t("auth.email")}
            value={email}
            error={error.email}
            onChangeText={email => this.setState({ email })}
          />

          <InputWithLabel
            label={i18n.t("auth.nickname")}
            value={login}
            error={error.login}
            onChangeText={login => this.setState({ login })}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title={i18n.t("profile.save")} onPress={this.editProfile} />
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

const mapStateToProps = state => ({
  // …
  nickname: state.profile.nickname,
  firstname: state.profile.firstname,
  lastname: state.profile.lastname,
  email: state.profile.email,
  photo: state.profile.photo
});

const mapDispatchToProps = {
  // …
  updateProfile,
  setNickname,
  setFirstname,
  setLastname,
  setEmail,
  setPhoto
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen);
