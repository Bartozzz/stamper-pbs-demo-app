import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";
import HeaderHamburger from "../../../components/HeaderHamburger";
import Background from "../../../components/Background";
import NoInternet from "../../../components/NoInternet";

import Theme from "./index.theme";
import * as Styled from "./index.styled";
import i18n from "../../../translations";
import * as Routes from "../../../navigation";
import defaultStyles from "../../../constants/Styles";

import images from "../../../constants/images";

class ProfileMenuScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.menu"),
    headerTitle: "",
    headerLeft: null,
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTransparent,
    // headerTransparent: true
  });

  render() {
    const { nickname, email, photo, navigation } = this.props;
    if (!this.props.navigation.state.params.internet) {
      return <NoInternet />;
    }
    return (
      <Theme>
        <Background source={images.BackgroundProfileWn}>
          <Styled.Logo />

          <Styled.Menu>
            <Styled.Avatar source={{ uri: photo }} />
            <Styled.Login>{nickname}</Styled.Login>

            <View style={defaultStyles.row}>
              <Styled.EmailIcon source={images.Email} />
              <Styled.Email>{email}</Styled.Email>
            </View>

            <Styled.MenuSpacer />

            <Styled.MenuItem
              onPress={() => navigation.push(Routes.PROFILE_EDIT)}
            >
              <Styled.MenuItemText>
                {i18n.t("profile.menu.edit")}
              </Styled.MenuItemText>
            </Styled.MenuItem>

            <Styled.MenuSpacer />

            <Styled.MenuItem
              onPress={() => navigation.push(Routes.PROFILE_PASSWORD)}
            >
              <Styled.MenuItemText>
                {i18n.t("profile.menu.password")}
              </Styled.MenuItemText>
            </Styled.MenuItem>

            <Styled.MenuSpacer />

            <Styled.MenuItem
              onPress={() => navigation.push(Routes.PROFILE_LEGAL)}
            >
              <Styled.MenuItemText>
                {i18n.t("profile.menu.tos")}
              </Styled.MenuItemText>
            </Styled.MenuItem>

            <Styled.MenuSpacer />

            <Styled.MenuItem
              onPress={() => navigation.push(Routes.PROFILE_LOGOUT)}
            >
              <Styled.MenuItemText>
                {i18n.t("profile.menu.logout")}
              </Styled.MenuItemText>
            </Styled.MenuItem>
          </Styled.Menu>
        </Background>
      </Theme>
    );
  }
}

const mapStateToProps = (state) => ({
  // …
  nickname: state.profile.nickname,
  email: state.profile.email,
  photo: state.profile.photo,
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileMenuScreen);
