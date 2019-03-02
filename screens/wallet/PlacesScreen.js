import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  ScrollView,
  View,
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

const BackgroundImage = require("../../assets/backgrounds/wallet_wn.png");

class WalletPlacesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "",
    headerLeft: (
      <InputSearch
        onChangeText={
          navigation.state.params &&
          Reflect.has(navigation.state.params, "handleSearch")
            ? navigation.state.params.handleSearch
            : null
        }
      />
    ),
    headerRight: <Hamburger navigation={navigation} />
  });

  state = {
    search: ""
  };

  componentDidMount() {
    this.props.getWallet();
    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  handleSearch = search => {
    this.setState({ search });
  };

  renderCards() {
    const { cards, navigation } = this.props;
    const { search } = this.state;

    const data = cards
      .filter(
        card =>
          card.id.toLowerCase().includes(search.toLowerCase()) ||
          card.title.toLowerCase().includes(search.toLowerCase()) ||
          card.cardNumber.toLowerCase().includes(search.toLowerCase()) ||
          card.merchantName.toLowerCase().includes(search.toLowerCase())
      )
      .reduce((acc, curr) => {
        const index = acc.findIndex(c => c.merchantName === curr.merchantName);

        if (index === -1) {
          acc = [
            ...acc,
            {
              ...curr,
              cardsAmount: 1
            }
          ];
        } else {
          acc = acc.map(
            (e, i) =>
              i === index
                ? {
                    ...e,
                    stampsTotal: e.stampsTotal + curr.stampsTotal,
                    stampsToDate: e.stampsToDate + curr.stampsToDate,
                    cardsAmount: e.cardsAmount + 1
                  }
                : e
          );
        }

        return acc;
      }, Array.from([]));

    return (
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={item => {
          return item.id;
        }}
        renderItem={({ item }) => (
          <Card
            image={{ uri: item.logoUrl }}
            title={item.merchantName}
            subtitle={i18n.t("wallet.cardsAmount", {
              count: item.cardsAmount
            })}
            action={i18n.t("wallet.seeCards")}
            onPress={() => {
              navigation.navigate(Routes.CARD_INFO, {
                merchant: item.merchantName,
                cards: cards.filter(c => c.merchantName === item.merchantName)
              });
            }}
          />
        )}
      />
    );
  }

  render() {
    const { isLoading, navigation } = this.props;

    return (
      <Background source={BackgroundImage} disableScroll>
        <WalletHeader
          title={i18n.t("navigation.wallet.places")}
          navigation={navigation}
          places
        />

        {isLoading ? (
          <View style={[defaultStyles.grow, defaultStyles.center]}>
            <ActivityIndicator color={colors.primary} size="large" />
          </View>
        ) : (
          <ScrollView style={styles.list}>
            {this.renderCards()}
            <View style={{ height: 60 }} />
          </ScrollView>
        )}
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 8
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
