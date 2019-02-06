import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";

import * as Routes from "../../navigation";
import Hamburger from "../../components/Hamburger";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import Background from "../../components/Background";
import InputSearch from "../../components/InputSearch";
import WalletHeader from "../../components/wallet/Header";

const BackgroundImage = require("../../assets/backgrounds/wallet.png");

class WalletPlacesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: <InputSearch />,
    headerRight: <Hamburger navigation={navigation} />
  });

  render() {
    const { navigation } = this.props;

    return (
      <Background source={BackgroundImage}>
        <WalletHeader
          title={i18n.t("navigation.wallet.places")}
          navigation={navigation}
          places
        />

        <Text>Wallet places screen</Text>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  // …
});

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletPlacesScreen);
