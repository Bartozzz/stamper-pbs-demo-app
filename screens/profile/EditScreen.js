import React from "react";
import { connect } from "react-redux";
import {
  Animated,
  StyleSheet,
  ActivityIndicator,
  AsyncStorage,
  ImageBackground,
  TouchableOpacity,
  Text,
  View
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { AntDesign } from "@expo/vector-icons";

import KeyboardAware from "../../components/helpers/KeyboardAware";
import Button from "../../components/forms/Button";
import Background from "../../components/Background";
import Error from "../../components/Error";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderTitle from "../../components/nav/HeaderTitle";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import InputWithLabel from "../../components/forms/InputWithLabel";
import Checkbox, { CheckBoxLabel } from "../../components/forms/Checkbox";


import {
  EMAIL,
  updatePhoto,
  updateProfile,
  setNickname,
  setFirstname,
  setLastname,
  setNewsletter,
  setEmail,
  setPhoto
} from "../../store/reducers/profile";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");

const UPLOAD_HEIGHT = 120;

class ProfileEditScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.edit"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
    processing: false,

    topAnim: new Animated.Value(0),
    heightAnim: new Animated.Value(0),

    firstName: this.props.firstname,
    lastName: this.props.lastname,
    login: this.props.nickname,
    newsletter: this.props.newsletter,
    email: this.props.email,
    photo: this.props.photo,
    uploading: false,

    error: {
      firstName: null,
      lastName: null,
      login: null,
      email: null,
      photo: null,
      other: null
    }
  };

  uploadImage = async () => {
    // Already uploading:
    if (this.state.uploading) {
      return;
    }

    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        base64: true,
        mediaTypes: "Images",
        allowsEditing: true,
        aspect: [1, 1]
      });

      if (!result.cancelled) {
        const photo = `data:image/jpg;base64,${result.base64}`;

        this.setState({
          uploading: true
        });

        this.props
          .updatePhoto(photo)
          .then(() => {
            this.props.setPhoto(photo);

            this.props.navigation.navigate(Routes.INFO_SUCCESS, {
              redirect: Routes.PROFILE_EDIT,
              message: i18n.t("success.profile.photoAdd")
            });
          })
          .catch(() =>
            this.props.navigation.navigate(Routes.INFO_ERROR, {
              redirect: Routes.PROFILE_EDIT,
              message: i18n.t("errors.profile.photoAdd")
            })
          );
      }
    }
  };

  editProfile = () => {
    const { login, firstName, lastName, email, newsletter } = this.state;

    this.setState({ processing: true });

    this.props
      .updateProfile(login, firstName, lastName, email, newsletter)
      .then(this.handleSuccess)
      .catch(this.handleError);
  };

  showNewsletterTerms = () => {
    this.props.navigation.push(Routes.PROFILE_NEWSLETTER_TOS);
  };

  handleSuccess = async () => {
    await AsyncStorage.setItem(EMAIL, this.state.email);

    // Update local store (here because update endpoint doesn't return updated
    // data):
    this.props.setNickname(this.state.login);
    this.props.setFirstname(this.state.firstName);
    this.props.setLastname(this.state.lastName);
    this.props.setNewsletter(this.state.newsletter);
    this.props.setEmail(this.state.email);
    this.props.setPhoto(this.state.photo);

    // Go back:
    this.props.navigation.navigate(Routes.INFO_SUCCESS, {
      redirect: Routes.PROFILE_MENU,
      message: i18n.t("success.changed")
    });
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

    this.setState({ error, processing: false });
  };

  handleKeyboardShow = keyboardHeight => {
    Animated.timing(this.state.heightAnim, {
      toValue: keyboardHeight,
      duration: 250
    }).start();

    Animated.timing(this.state.topAnim, {
      toValue: -UPLOAD_HEIGHT,
      duration: 250
    }).start();
  };

  handleKeyboardHide = () => {
    Animated.timing(this.state.heightAnim, {
      toValue: 0,
      duration: 250
    }).start();

    Animated.timing(this.state.topAnim, {
      toValue: 0,
      duration: 250
    }).start();
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      login,
      newsletter,
      photo,
      error
    } = this.state;

    return (
      <KeyboardAware
        onKeyboardShow={this.handleKeyboardShow}
        onKeyboardHide={this.handleKeyboardHide}
      >
        {() => (
          <>
            <TouchableOpacity onPress={this.uploadImage}>
              <ImageBackground
                resizeMode="cover"
                source={{ uri: photo }}
                style={styles.upload}
              >
                {this.state.uploading ? (
                  <ActivityIndicator color="white" size="large" />
                ) : (
                  <React.Fragment>
                    <AntDesign name="camerao" size={36} color="white" />
                    <Text style={styles.uploadText}>
                      {i18n.t("profile.edit.changePhoto")}
                    </Text>
                  </React.Fragment>
                )}
              </ImageBackground>
            </TouchableOpacity>

            <Animated.View style={[{ flex: 1 }, { top: this.state.topAnim }]}>
              <Background source={BackgroundImage}>
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

                  <Checkbox
                    checked={newsletter}
                    onChange={newsletter => this.setState({ newsletter })}
                    label={
                      <View style={{ flexDirection: "row" }}>
                        <CheckBoxLabel>
                          {i18n.t("profile.edit.newsletter")}
                        </CheckBoxLabel>

                        <TouchableOpacity onPress={this.showNewsletterTerms}>
                          <CheckBoxLabel
                            style={
                              { fontWeight: "900", textTransform: "uppercase" }
                            }
                          >
                            {i18n.t("more")}
                          </CheckBoxLabel>
                        </TouchableOpacity>
                      </View>
                    }
                  />
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    title={i18n.t("profile.save")}
                    onPress={this.editProfile}
                    processing={this.state.processing}
                  />
                </View>

                <Animated.View style={[{ height: this.state.heightAnim }]} />
              </Background>
            </Animated.View>
          </>
        )}
      </KeyboardAware>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,

    paddingTop: 15,
    marginHorizontal: 30
  },

  buttonContainer: {
    marginVertical: 20,
    marginHorizontal: 30
  },

  upload: {
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
    height: UPLOAD_HEIGHT
  },
  uploadText: {
    marginTop: 5,

    fontSize: 10,
    color: colors.info
  }
});

const mapStateToProps = state => ({
  // …
  nickname: state.profile.nickname,
  firstname: state.profile.firstname,
  lastname: state.profile.lastname,
  newsletter: state.profile.newsletter,
  email: state.profile.email,
  photo: state.profile.photo
});

const mapDispatchToProps = {
  // …
  updatePhoto,
  updateProfile,
  setNickname,
  setFirstname,
  setLastname,
  setNewsletter,
  setEmail,
  setPhoto
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEditScreen);
