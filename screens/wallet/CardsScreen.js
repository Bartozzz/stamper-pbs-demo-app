import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, Image, View, ScrollView } from "react-native";
import Toast from "react-native-easy-toast";

import * as Routes from "../../navigation";
import HeaderHamburger from "../../components/HeaderHamburger";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import Background from "../../components/Background";
import InputSearch from "../../components/InputSearch";
import WalletHeader from "../../components/screens/wallet/Header";
import CardsList from "../../components/screens/wallet/CardsList";

import { getWallet } from "../../store/reducers/wallet";

const BackgroundImage = require("../../assets/backgrounds/wallet_wn.png");
const WalletLoader = require("../../assets/loaders/wallet.gif");

const height = 90;

class WalletCardsScreen extends React.Component {
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
    isCheckingIfCacheValid: false,
    search: null,
  };

  async componentDidMount() {
    // const shouldRefetchData = await AsyncStorage.getItem(FORCE_REFRESH_WALLET);
    // const shouldRefetchBool = JSON.parse(shouldRefetchData);
    // const hasCards = Array.isArray(cards) && cards.length > 0;
    //
    // if (shouldRefetchData === null || shouldRefetchBool === true || !hasCards) {
    //   this.setState({ isCheckingIfCacheValid: false });
    //   console.log("Refreshing wallet cards");
    //
    //   getWallet().then(data => {
    //     AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(false));
    //     AsyncStorage.setItem(WALLET_CARDS, JSON.stringify(data.payload.data));
    //   });
    // } else {
    //   this.setState({ isCheckingIfCacheValid: false });
    // }
    if (this.props.navigation.state.params.internet === true) {
      this.props.getWallet();
    }

    this.props.navigation.setParams({ handleSearch: this.handleSearch });
  }

  removeCard = (cardId) => {
    this.props.navigation.push(Routes.WALLET_CARD_REMOVAL_CONFIRMATION, {
      cardId: cardId,
    });
  };

  handleSearch = (search) => {
    this.setState({ search });
  };

  navigateToCardInfo = (card) => {
    this.props.navigation.push(Routes.CARD_INFO, {
      merchant: "",
      cards: [card],
      backTo: Routes.WALLET_CARDS,
    });
  };

  renderCards() {
    const { cards } = this.props;
    const { search } = this.state;
    let data = cards;

    // Filter data based on current search term:
    if (search) {
      data = data.filter(
        (card) =>
          card.id.toLowerCase().includes(search.toLowerCase()) ||
          card.cardNumber.toLowerCase().includes(search.toLowerCase()) ||
          card.title.toLowerCase().includes(search.toLowerCase()) ||
          card.merchantName.toLowerCase().includes(search.toLowerCase())
      );
    }

    return (
      <CardsList
        data={data}
        onCheck={(item) => {
          this.navigateToCardInfo(item);
        }}
        onDelete={(item, rowMap) => {
          if (!this.props.navigation.state.params.internet) {
            rowMap[item.id].closeRow();
          } else {
            rowMap[item.id].closeRow();
            this.removeCard(item.id);
          }
        }}
      />
    );
  }

  render() {
    const { isLoading, navigation } = this.props;
    const { isCheckingIfCacheValid, internet } = this.state;
    return (
      <Background source={BackgroundImage} disableScroll>
        <WalletHeader
          title={i18n.t("navigation.wallet.cards")}
          navigation={navigation}
          internet={internet}
          cards
        />

        {!isCheckingIfCacheValid && (
          <>
            {isLoading ? (
              <View style={[defaultStyles.grow, defaultStyles.center]}>
                <Image
                  source={WalletLoader}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            ) : (
              <ScrollView style={styles.list}>
                {this.renderCards()}
                <View style={{ height: 60 }} />
              </ScrollView>
            )}
          </>
        )}

        <Toast ref={(errorToast) => (this.errorToast = errorToast)} />
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    paddingTop: 8,
  },

  item: {
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 10,

    borderRadius: 10,
  },
  itemFront: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  itemRemove: {
    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    top: 10,
    right: -height,

    height: height,
    width: height,

    // backgroundColor: "#555f6f",
    backgroundColor: "#f16c41",
    borderRadius: 10,

    // Need to add zIndex to ensure that the TouchableOpacity will receive press
    // events on Android:
    zIndex: 1,
  },
  itemRemoveImage: {
    width: 40,
    height: 40,
  },

  textId: {
    flex: 1,

    fontSize: 14,
    fontFamily: "nunito-black",
    color: "#95989A",
  },
  textTitle: {
    marginTop: 2,
    marginBottom: 3,

    fontSize: 14,
    fontFamily: "poppins-bold",
    color: colors.color,
  },
  textExpiry: {
    fontSize: 9,
    fontFamily: "nunito-regular",
    color: "#95989A",
  },
  textAmount: {
    flex: 1,
    marginTop: 5,

    textAlign: "right",
    fontSize: 12,
    fontFamily: "nunito-regular",
    color: "#95989A",
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletCardsScreen);
