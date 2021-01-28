import React from "react";
import { connect } from "react-redux";
import * as Analytics from "expo-firebase-analytics";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

import Background from "../../../components/Background";
import HeaderTitle from "../../../components/HeaderTitle";
import HeaderHamburger from "../../../components/HeaderHamburger";
import HeaderBack from "../../../components/HeaderBack";

import {
  logout,
  setExpiryDate,
  setAccessToken,
  setRefreshToken,
} from "../../../store/reducers/auth";

import i18n from "../../../translations";
import * as Routes from "../../../navigation";
import defaultStyles from "../../../constants/Styles";

import images from "../../../constants/images";

class ProfileLogoutScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.profile.logout"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBack navigation={navigation} onPress={() => navigation.goBack()} />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines,
  });

  state = {
    processing: false,
  };

  accept = async () => {
    this.setState({ processing: true });

    // Clear local volatile storage:
    this.props.setExpiryDate(null);
    this.props.setAccessToken(null);
    this.props.setRefreshToken(null);

    this.props.logout().finally(() => {
      this.props.navigation.navigate(Routes.AUTH_LOADING);
      Analytics.logEvent("sign_out");
    });
  };

  refuse = () => {
    this.props.navigation.navigate(Routes.PROFILE_MENU, { internet: true });
  };

  render() {
    return (
      <Theme>
        <Background source={images.BackgroundLogoutWn}>
          <Styled.Logout style={defaultStyles.center}>
            <Styled.LogoutIcon source={images.NextIcon} />

            <Styled.LogoutText>
              {i18n.t("profile.logout.sure")}
            </Styled.LogoutText>
          </Styled.Logout>

          <Styled.ButtonsContainer style={defaultStyles.row}>
            <Styled.ButtonYesNo
              title={i18n.t("yes")}
              onPress={this.accept}
              processing={this.state.processing}
            />

            <Styled.ButtonYesNo
              title={i18n.t("no")}
              onPress={this.refuse}
              processing={this.state.processing}
            />
          </Styled.ButtonsContainer>
        </Background>
      </Theme>
    );
  }
}

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  logout,
  setExpiryDate,
  setAccessToken,
  setRefreshToken,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileLogoutScreen);
