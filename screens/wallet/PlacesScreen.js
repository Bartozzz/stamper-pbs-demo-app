import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";

import * as Routes from "../../navigation";
import Card from "../../components/Card";
import Hamburger from "../../components/Hamburger";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import Background from "../../components/Background";
import InputSearch from "../../components/InputSearch";
import WalletHeader from "../../components/wallet/Header";
import { getWallet } from "../../store/reducers/wallet";

const BackgroundImage = require("../../assets/backgrounds/wallet.png");

class WalletPlacesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: <InputSearch />,
    headerRight: <Hamburger navigation={navigation} />
  });

  componentDidMount() {
    this.props.getWallet();
  }

  renderCards() {
    const { cards, isLoading } = this.props;

    console.log(cards);

    if (isLoading) {
      return <ActivityIndicator color={colors.primary} size="large" />;
    } else {
      return (
        <FlatList
          data={cards}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              key={item.id}
              image={{ uri: item.logoUrl }}
              title={item.merchantName}
              subtitle={item.stampsTotal}
              action={"Zobacz karty"}
              onPress={() => null}
            />
          )}
        />
      );
    }
  }

  render() {
    const { navigation } = this.props;

    return (
      <Background source={BackgroundImage} disableScroll>
        <WalletHeader
          title={i18n.t("navigation.wallet.places")}
          navigation={navigation}
          places
        />

        <ScrollView style={styles.list}>{this.renderCards()}</ScrollView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    margin: 8
  }
});

const mapStateToProps = state => ({
  // …
  isLoading: state.wallet.isLoading,
  cards: state.wallet.cards
});

const mapDispatchToProps = {
  // …
  getWallet
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletPlacesScreen);
