import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, ScrollView, View, FlatList, Image } from "react-native";
import * as Analytics from "expo-firebase-analytics";

import * as Routes from "../../navigation";
import * as Card from "../../components/layout/Card";
import HeaderHamburger from "../../components/HeaderHamburger";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import Background from "../../components/Background";
import InputSearch from "../../components/InputSearch";
import WalletHeader from "../../components/screens/wallet/Header";
import { getWallet } from "../../store/reducers/wallet";

import images from "../../constants/images";

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
    headerRight: <HeaderHamburger navigation={navigation} />,
  });

  state = {
    search: "",
  };

  componentDidMount() {
    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  handleSearch = (search) => {
    this.setState({ search });
  };

  renderCards() {
    const { cards, navigation } = this.props;
    const { search } = this.state;

    const data = cards
      .filter(
        (card) =>
          card.id.toLowerCase().includes(search.toLowerCase()) ||
          card.title.toLowerCase().includes(search.toLowerCase()) ||
          card.cardNumber.toLowerCase().includes(search.toLowerCase()) ||
          card.merchantName.toLowerCase().includes(search.toLowerCase())
      )
      .reduce((acc, curr) => {
        const index = acc.findIndex(
          (c) => c.merchantName === curr.merchantName
        );

        if (index === -1) {
          acc = [
            ...acc,
            {
              ...curr,
              cardsAmount: 1,
            },
          ];
        } else {
          acc = acc.map((e, i) =>
            i === index
              ? {
                  ...e,
                  stampsTotal: e.stampsTotal + curr.stampsTotal,
                  stampsToDate: e.stampsToDate + curr.stampsToDate,
                  cardsAmount: e.cardsAmount + 1,
                }
              : e
          );
        }

        return acc;
      }, []);

    return (
      <FlatList
        data={data}
        numColumns={2}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 60 }}
        keyExtractor={(item) => {
          return item.id;
        }}
        renderItem={({ item }) => (
          <Card.Component
            image={{ uri: item.logoUrl }}
            title={item.merchantName}
            subtitle={i18n.t("wallet.cardsAmount", {
              count: item.cardsAmount,
            })}
            renderButton={() => (
              <Card.Button
                title={i18n.t("wallet.seeCards")}
                onPress={() => {
                  const selectedCards = cards.filter(
                    (c) => c.merchantName === item.merchantName
                  );
                  navigation.push(Routes.CARD_INFO, {
                    merchant: item.merchantName,
                    cards: selectedCards,
                  });
                  selectedCards.forEach((c) =>
                    Analytics.logEvent("wallet", {
                      title: c.title,
                      merchantName: c.merchantName,
                    })
                  );
                }}
              />
            )}
          />
        )}
      />
    );
  }

  render() {
    const { isLoading, navigation } = this.props;

    return (
      <Background source={images.BackgroundWalletWn} disableScroll>
        <WalletHeader
          title={i18n.t("navigation.wallet.places")}
          navigation={navigation}
          internet={this.props.navigation.state.params.internet}
          places
        />

        {isLoading ? (
          <View style={[defaultStyles.grow, defaultStyles.center]}>
            <Image
              source={images.WalletLoader}
              style={{ width: 150, height: 150 }}
            />
          </View>
        ) : (
          this.renderCards()
        )}
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 8,
  },
});

const mapStateToProps = (state) => ({
  // …
  isLoading: state.wallet.isLoading,
  cards: state.wallet.cards,
});

const mapDispatchToProps = {
  // …
  getWallet,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletPlacesScreen);
