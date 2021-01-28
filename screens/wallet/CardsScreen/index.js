import * as React from "react";
import { connect } from "react-redux";
import { Image, View } from "react-native";
import Toast from "react-native-easy-toast";
import * as Analytics from "expo-firebase-analytics";

import * as Routes from "../../../navigation";

import * as Styled from "./index.styled";

import HeaderHamburger from "../../../components/HeaderHamburger";
import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";
import Background from "../../../components/Background";
import InputSearch from "../../../components/InputSearch";
import WalletHeader from "../../../components/screens/wallet/Header";

import { getWallet } from "../../../store/reducers/wallet";

import images from "../../../constants/images";

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

  removeCard = (cardId, title, merchantName) => {
    this.props.navigation.push(Routes.WALLET_CARD_REMOVAL_CONFIRMATION, {
      cardId: cardId,
      title: title,
      merchantName: merchantName,
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
    Analytics.logEvent("wallet", {
      title: card.title,
      merchantName: card.merchantName,
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
      <Styled.List
        data={data}
        contentContainerStyle={{ paddingBottom: 60 }}
        onCheck={(item) => {
          this.navigateToCardInfo(item);
        }}
        onDelete={(item, rowMap) => {
          if (!this.props.navigation.state.params.internet) {
            rowMap[item.id].closeRow();
          } else {
            rowMap[item.id].closeRow();
            this.removeCard(item.id, item.title, item.merchantName);
          }
        }}
      />
    );
  }

  render() {
    const { isLoading, navigation } = this.props;
    const { isCheckingIfCacheValid, internet } = this.state;
    return (
      <Background source={images.BackgroundWalletWn} disableScroll>
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
                  source={images.WalletLoader}
                  style={{ width: 150, height: 150 }}
                />
              </View>
            ) : (
              this.renderCards()
            )}
          </>
        )}

        <Toast ref={(errorToast) => (this.errorToast = errorToast)} />
      </Background>
    );
  }
}

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
